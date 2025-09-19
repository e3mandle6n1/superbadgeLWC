/**
 * BoatTile LWC
 * This component represents a tile for displaying boat information.
 * It shows the boat's picture and highlights the tile if it is selected.
 * When clicked, it dispatches a 'boatselect' event with the boat's ID.
 *
 * @description This component is used to display individual boat details in a tile format.
 * @author Emandleni M
 * @date 2024-06-10
 * Key Features:
 * - Displays boat image as background.
 * - Highlights the tile when selected.
 * - Dispatches a 'boatselect' event with the boat ID when clicked.
 *
 */
import { api, LightningElement } from "lwc";

const TILE_WRAPPER_SELECTED_CLASS = "tile-wrapper selected";

const TILE_WRAPPER_UNSELECTED_CLASS = "tile-wrapper";

export default class BoatTile extends LightningElement {
  @api
  boat;

  @api
  selectedBoatId;

  /**
   * Getter for dynamically setting the background image style.
   * Returns a CSS background-image property with the boat's picture URL.
   * If no picture is available, it will not set a background image.
   *
   */
  get backgroundStyle() {
    return "background-image:url(" + this.boat.Picture__c + ")";
  }

  /**
   * Getter for determining the CSS class of the tile wrapper.
   * Returns a different class if the boat is selected to apply highlighting.
   * Compares the boat's ID with the selectedBoatId property.
   */
  get tileClass() {
    if (this.boat.Id == this.selectedBoatId) {
      return TILE_WRAPPER_SELECTED_CLASS;
    }

    return TILE_WRAPPER_UNSELECTED_CLASS;
  }

  /**
   * Handles the selection of the boat tile.
   * Sets the selectedBoatId to the current boat's ID.
   * Dispatches a custom 'boatselect' event with the boat ID in the event detail.
   */
  selectBoat() {
    this.selectedBoatId = this.boat.Id;

    const boatselect = new CustomEvent("boatselect", {
      detail: {
        boatId: this.selectedBoatId
      }
    });

    this.dispatchEvent(boatselect);
  }
}
