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
	is_public: false,
	group_id: '00ffedbb-ff29-5138-9b5d-cd1f6ae3bc6b',

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

## Methods

This is not a complete list of methods. Please refer to the [full documentation](https://ideea.io/3ps/docs) for the full list of methods.

### TPS.components.create(component)
In 3PS a component represents a single .STL file and an object is a collection of multiple components. Your component can be public or private, public components are accessible by all users and can be printed by anyone. You can also set your component’s default print settings for easy replication.

```js
tps.components.create({
	name: 'Dice',
	is_public: false,
	group_id: '00ffedbb-ff29-5138-9b5d-cd1f6ae3bc6b',

	// .stl File
	stl: fs.readFileSync('./dice.stl'),

	// Default Print Settings
	material: 'PLA',
	process: 'FDM',
	resolution: '200',
	infill: '20',
	color: 'Red',
}).then((component) => {

	console.log(component)

})
```

### TPS.print(job)
A job reprsents a request from a customer to print one or more componets. To create a job send an array of objects and compoents with the .print() method

```js
tps.print({
	group_id: '00ffedbb-ff29-5138-9b5d-cd1f6ae3bc6b',
	components: [{
		id: 'cead04bc-cf4f-402a-8e90-1f33669efa03'
	}]
}).then((job) => {

	console.log(`Printing Job: ${job.id}`)

})
```
