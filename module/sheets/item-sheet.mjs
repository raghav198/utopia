export class UtopiaItemSheet extends ItemSheet {
    get template() {
        return `systems/utopia/templates/item/item-${this.item.type}-sheet.html`;
    }
}