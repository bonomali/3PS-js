<p align="center">
  <img width="192" src="https://ideea.io/static/img/logo-text.svg" alt="Ideea">
</p>

---

### [3PS](https://ideea.io/3ps) &nbsp;&nbsp;&nbsp; [Ideea.io](https://ideea.io) &nbsp;&nbsp;&nbsp; [Full Documentation](https://ideea.io/docs/3ps) &nbsp;&nbsp;&nbsp; [Cheat Sheet](https://github.com/Ideea-inc/3ps-js/blob/master/docs/cheat-sheet.md)

---

# 3PS JS SDK

This is the official SDK for the 3PS API. You can use this SDK to create components and objects and start new print jobs.

## Installation

```
$ npm install tps
```

## Getting Started

```js
const TPS = require('3ps-js')
const fs = require('fs')

var tps = new TPS('YOUR_API_KEY')

var component = {
	name: 'Dice',
	group_id: '00ffedbb-ff29-5138-9b5d-cd1f6ae3bc6b',
	is_public: false,

	// .stl File
	stl: fs.readFileSync('./dice.stl'),

	// Default Print Settings
	material: 'PLA',
	process: 'FDM',
	resolution: '200',
	infill: '20',
	color: 'Red',
}


// Create Component
tps.components.create(component).then((newComponent) =&gt; {

	// Print Component
	tps.print({
		group_id: '00ffedbb-ff29-5138-9b5d-cd1f6ae3bc6b',
		fulfillment_type: 'standard',
		components: [{
			id: newComponent.id
		}]
	}).then((job) =&gt; {
		console.log(`Printing ${job.id}`)
	}) 
})
```
