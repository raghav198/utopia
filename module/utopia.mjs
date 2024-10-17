import { UtopiaActor } from "./documents/actor.mjs";
import { UtopiaActorSheet } from "./sheets/actor-sheet.mjs";

Hooks.once('init', () => {
    console.log("Utopia | Initializing");
    Actors.unregisterSheet('core',  ActorSheet);
    Actors.registerSheet('utopia', UtopiaActorSheet, {makeDefault: true});
    CONFIG.Actor.documentClass = UtopiaActor;
    console.log("Utopia | Initialized");
});

Handlebars.registerHelper('for_split', function(from, to, incr, thresh, block) {
    let accum = '';
    for(var i = from; i < to; i += incr) {
        block.data.index = i;
        if (i < thresh)
            accum += block.fn(i);
        else
            accum += block.inverse(i);
    }   
    return accum;
});