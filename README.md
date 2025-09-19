# Lightning Web Specialist Superbadge Challenge

This repository contains the Lightning Web Components (LWC) and configuration required for the Salesforce Trailhead **Lightning Web Specialist Superbadge** challenge.

## Contents

- Custom Lightning Web Components for the superbadge requirements
- Apex classes and test classes supporting LWC functionality
- Metadata configuration for custom objects, fields, and permissions
- Sample data for testing and validation

## Key Components

- **BoatSearch**: Main search component for boats
- **BoatTile**: Displays individual boat details
- **BoatDetails**: Shows detailed information for a selected boat
- **BoatMap**: Displays boat locations on a map
- **Apex Controllers**: Provide data and business logic for LWCs
- **Custom Objects**: Includes Boat, BoatType, and related records

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <your-repo-url>
   ```

2. **Authorize Your Salesforce Org**
   ```bash
   sfdx auth:web:login -a <your-org-alias>
   ```

3. **Push Source to Org**
   ```bash
   sfdx force:source:push
   ```

4. **Import Sample Data**
   ```bash
   sfdx force:data:tree:import -p data/Boat__c-plan.json
   ```

5. **Assign Permission Sets**
   ```bash
   sfdx force:user:permset:assign -n Lightning_Web_Specialist
   ```

## Project Structure

- `force-app/main/default/lwc/` – Lightning Web Components
- `force-app/main/default/classes/` – Apex classes and test classes
- `force-app/main/default/objects/` – Custom object definitions
- `data/` – Sample data files
- `README.md` – Project documentation

## Resources

- [Trailhead Superbadge Guide](https://trailhead.salesforce.com/superbadges)
- [Lightning Web Components Documentation](https://developer.salesforce.com/docs/component-library/documentation/lwc)
- [Salesforce CLI Reference](https://developer.salesforce.com/docs/atlas.en-us.sfdx_cli_reference.meta/sfdx_cli_reference/cli_reference.htm)

## Validation

- Complete all superbadge requirements in your Salesforce org
- Run all Apex tests to ensure coverage
- Verify LWC functionality in the Lightning App

---