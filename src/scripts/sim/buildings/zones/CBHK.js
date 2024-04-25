import { City } from '../../city.js';
import { Zone } from './zone.js';
import { ResidentsModule } from '../modules/residents.js';
import { BuildingType } from '../buildingType.js';

export class CBHK extends Zone {
  /**
   * @type {ResidentsModule}
   */
  residents = new ResidentsModule(this);


  /** 
   * @type {number}
   */
  buildingCost = 800;


  constructor(x, y) {
    super(x, y);
    this.name = generateBuildingName();
    this.type = BuildingType.residential;
    this.size = 3;
    this.style = 'C'
  }

  /**x
   * Steps the state of the zone forward in time by one simulation step
   * @param {City} city 
   */
  simulate(city) {
    super.simulate(city);
    this.residents.simulate(city);
  }

  /**
   * Handles any clean up needed before a building is removed
   */
  dispose() {
    this.residents.dispose();
    super.dispose();
  }

  /**
   * Returns an HTML representation of this object
   * @returns {string}
   */
  toHTML() {
    let html = super.toHTML();
    html += this.residents.toHTML();
    return html;
  }
}

// Arrays of different name components
const prefixes = ['Emerald', 'Ivory', 'Crimson', 'Opulent', 'Celestial', 'Enchanted', 'Serene', 'Whispering', 'Stellar', 'Tranquil'];
const suffixes = ['Tower', 'Residence', 'Manor', 'Court', 'Plaza', 'House', 'Mansion', 'Place', 'Villa', 'Gardens'];

// Function to generate a random building name
function generateBuildingName() {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  return prefix + ' ' + suffix;
}