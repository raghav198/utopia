export class UtopiaActor extends Actor {
    prepareData() {
        super.prepareData();
    }

    prepareBaseData() {
        
    }

    prepareDerivedData() {
        const actorData = this;
        const systemData = actorData.system;

        // compute SHP, DHP, and Stamina max
        const points = systemData.points;
        points.body = 10;
        const stats = systemData.stats;
        
        const level = points.body + points.mind + points.soul + points.held;
        systemData.shp.max = points.body * stats.con + level;
        systemData.dhp.max = points.soul * stats.eff + level;
        systemData.stamina.max = points.mind * stats.end + level;

        // compute subtrait maximums
        const subtraits = systemData.subtraits;
        for (let subtrait of ["speed", "dexterity", "power", "fortitude"]) {
            subtraits[subtrait].max = points.body * (1 + subtraits[subtrait].gifted);
        }

        for (let subtrait of ["engineering", "memory", "resolve", "awareness"]) {
            subtraits[subtrait].max = points.body * (1 + subtraits[subtrait].gifted);
        }

        for (let subtrait of ["portrayal", "stunt", "appeal", "language"]) {
            subtraits[subtrait].max = points.body * (1 + subtraits[subtrait].gifted);
        }

        // clamp subtrait values to range [1, max]
        for (let [name, obj] of Object.entries(systemData.subtraits)) {
            if (obj.value > obj.max) {
                console.warn(`Utopia | Clamping ${name} to max`);
                obj.value = obj.max;
            }
            
            if (obj.value < 1) {
                console.warn(`Utopia | Clamping ${name} to min`);
                obj.value = 1;
            }
        }

        // compute traits
        const traits = systemData.traits;
        traits.agility.value = subtraits.speed.value + subtraits.dexterity.value;
        traits.strength.value = subtraits.power.value + subtraits.fortitude.value;
        traits.intellect.value = subtraits.engineering.value + subtraits.memory.value;
        traits.will.value = subtraits.resolve.value + subtraits.awareness.value;
        traits.display.value = subtraits.portrayal.value + subtraits.stunt.value;
        traits.charm.value = subtraits.appeal.value + subtraits.language.value;

        // compute trait/subtrait modifiers
        for (let [_, obj] of Object.entries(systemData.traits)) {
            obj.mod = obj.value - 4;
        }

        for (let [_, obj] of Object.entries(systemData.subtraits)) {
            obj.mod = obj.value - 4;
            if (obj.gifted) obj.mod = Math.max(0, obj.mod);
        }

        return actorData;
    }
}