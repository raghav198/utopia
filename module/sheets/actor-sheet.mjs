export class UtopiaActorSheet extends ActorSheet {
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ['utopia', 'sheet', 'actor'],
            template: "systems/utopia/templates/actor/actor-sheet.html",
            width: 600,
            height: 600,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features"}]
        });
    }

    get template() {
        return `systems/utopia/templates/actor/actor-sheet.html`;
    }

    getData() {
        const context = super.getData();
        const actorData = context.data;

        context.system = actorData.system;
        context.flags = actorData.flags;

        return context;
    }

    activateListeners(html) {
        super.activateListeners(html);

        html.on('click', '.turn-token', (ev) => {
            console.log(this.actor);
            if ($(ev.currentTarget)[0].checked) {
                this.actor.update({"system.tokens.turn": this.actor.system.tokens.turn + 1});
            } else {
                this.actor.update({"system.tokens.turn": this.actor.system.tokens.turn - 1});
            }
            this.render(true);
        });

        html.on('click', '.interrupt-token', (ev) => {
            if ($(ev.currentTarget)[0].checked) {
                this.actor.update({"system.tokens.interrupt": this.actor.system.tokens.interrupt + 1});
            } else {
                this.actor.update({"system.tokens.interrupt": this.actor.system.tokens.interrupt - 1});
            }
            this.render(true);
        });
    }
}