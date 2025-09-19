 /**
 * BoatSearchForm LWC
 * 
 * This Lightning Web Component provides a search form for selecting boat types.
 * It fetches available boat types from the Apex BoatDataService and presents them as options.
 * When the user selects a boat type, it dispatches a custom 'search' event with the selected type.
 * 
 * @description This component is used to search for boats by type.
 * @author Emandleni M
 * @date 2024-06-10
 * Key Features:
 * - Uses @wire to call the getBoatTypes Apex method and populate search options.
 * - Adds an "All Types" option to allow searching without filtering by type.
 * - Handles errors from the Apex call and exposes them for UI display.
 * - Dispatches a 'search' event with the selected boat type ID when the selection changes.
 */
import { LightningElement, track, wire } from "lwc";

import getBoatTypes from "@salesforce/apex/BoatDataService.getBoatTypes";

export default class BoatSearchForm extends LightningElement {
  selectedBoatTypeId = "";

  error = undefined;

  @track
  searchOptions;

  /**
   * Wire adapter to fetch boat types from Apex.
   * On success, maps the data to label/value pairs for the dropdown.
   * Prepends an "All Types" option for unfiltered search.
   * On error, sets the error property for UI feedback.
   */
  @wire(getBoatTypes)
  boatTypes({ data, error }) {
    if (data) {
      this.searchOptions = data.map((type) => {
        return { label: type.Name, value: type.Id };
      });

      this.searchOptions.unshift({ label: "All Types", value: "" });
    } else if (error) {
      this.searchOptions = undefined;

      this.error = error;
    }
  }

  /**
   * Handles changes to the search option dropdown.
   * Updates the selectedBoatTypeId and dispatches a custom 'search' event
   * with the selected boat type ID as event detail.
   */
  handleSearchOptionChange(event) {
    this.selectedBoatTypeId = event.detail.value;

    const searchEvent = new CustomEvent("search", {
      detail: {
        boatTypeId: this.selectedBoatTypeId
      }
    });

    this.dispatchEvent(searchEvent);
  }
}
