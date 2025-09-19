/**
 * BoatMap Lightning Web Component
 *
 * Displays a map marker for a boat's geolocation. Subscribes to a message channel to receive boat recordId updates.
 * Fetches boat geolocation data using Lightning Data Service and displays it on a map.
 * 
 * @description This component is used to search for boats by type.
 * @author Emandleni M
 * @date 2024-06-10
 *
 */

import { api, LightningElement, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";
import BOATMC from "@salesforce/messageChannel/BoatMessageChannel__c";

/**
 * Imports for Lightning Message Service and MessageContext.
 * @description These imports are necessary for subscribing to the message channel.
 */
import {
  subscribe,
  APPLICATION_SCOPE,
  MessageContext
} from "lightning/messageService";

/**
 * Field names for boat geolocation.
 * @description These constants define the field names used to retrieve boat geolocation data.
 * @constant {string} LONGITUDE_FIELD - The API name for the boat's longitude field.
 * @constant {string} LATITUDE_FIELD - The API name for the boat's latitude field.
 * @constant {Array<string>} BOAT_FIELDS - An array containing the longitude and latitude field names.
 */
const LONGITUDE_FIELD = "Boat__c.Geolocation__Longitude__s";
const LATITUDE_FIELD = "Boat__c.Geolocation__Latitude__s";
const BOAT_FIELDS = [LONGITUDE_FIELD, LATITUDE_FIELD];

export default class BoatMap extends LightningElement {
  subscription = null;

  boatId;

  @api
  get recordId() {
    return this.boatId;
  }

  set recordId(value) {
    this.setAttribute("boatId", value);

    this.boatId = value;
  }

  error = undefined;

  mapMarkers = [];

  @wire(MessageContext)
  messageContext;

  /**
   * Wire adapter for retrieving boat record data.
   * @param {Object} param0 - The wired data object.
   * @param {Object} param0.error - The error object if the record retrieval fails.
   * @param {Object} param0.data - The data object containing the boat record if retrieval is successful.
   * @returns {void}
   * @memberof BoatMap
   */
  @wire(getRecord, { recordId: "$boatId", fields: BOAT_FIELDS })
  wiredRecord({ error, data }) {

    if (data) {
      this.error = undefined;

      const longitude = data.fields.Geolocation__Longitude__s.value;

      const latitude = data.fields.Geolocation__Latitude__s.value;

      this.updateMap(longitude, latitude);
    } else if (error) {
      this.error = error;

      this.boatId = undefined;

      this.mapMarkers = [];
    }
  }

  /*
    * Subscribe to the message channel to retrieve the recordId and assign it to boatId.
    * This subscription should only happen once, when there is no existing subscription
    * and no boatId.
    * 
    * @returns {void}
    * @memberof BoatMap
    */
  subscribeMC() {
    if (this.subscription || this.recordId) {
      return;
    }

    this.subscription = subscribe(
      this.messageContext,

      BOATMC,

      (message) => {
        this.boatId = message.recordId;
      },

      { scope: APPLICATION_SCOPE }
    );
  }

  connectedCallback() {
    this.subscribeMC();
  }

  /**
   * Update the map with the given longitude and latitude for the boat location.
   * @param {number} Longitude - The longitude of the boat location.
   * @param {number} Latitude - The latitude of the boat location.
   * @returns {void}
   */
  updateMap(Longitude, Latitude) {
    this.mapMarkers = [{ location: { Latitude, Longitude } }];
  }

  get showMap() {
    return this.mapMarkers.length > 0;
  }
}
