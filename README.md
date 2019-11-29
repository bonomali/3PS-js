<p align="center">
  <img width="192" src="https://ideea.io/static/img/3ps.png" alt="3PS">
</p>

---

### [3PS](https://ideea.io/3ps) &nbsp;&nbsp;|&nbsp;&nbsp; [Ideea.io](https://ideea.io) &nbsp;&nbsp;|&nbsp;&nbsp; [User Guide](https://ideea.io/3ps/user-guide) &nbsp;&nbsp;|&nbsp;&nbsp; [Full Documentation](https://ideea.io/docs/3ps) &nbsp;&nbsp;|&nbsp;&nbsp; [NPM](https://www.npmjs.com/package/3ps-js)

---

# 3PS JS SDK

The 3PS API represents an abstraction of a 3D printer, with this API you can upload a .STL file and receive a tangible object just hours later. With this API you can print in any material, at any size, shipped anywhere in the world. Add 3D printing to your app, product or service in a matter of minutes with 3PS.

## Installation

```
$ npm install 3ps-js
```

## Example

```js
const TPS = require('3ps-js')
const fs = require('fs')

var tps = new TPS('API_KEY')

var component = {
	name: 'Dice',
	is_public: false,
	group_id: '00ffedbb-ff29-5138-9b5d-cd1f6ae3bc6b',

	// .stl File
	stl: fs.readFileSync('./dice.stl'),

	// Default Print Settings
	machine: 'ender-3',
	material: 'pla-red',
	resolution: 200,
	infill: 20,
	scale: 1,
}


// Create Component
tps.components.create(component).then(function(newComponent) {

	// Print Component
	tps.jobs.create({
		group_id: '00ffedbb-ff29-5138-9b5d-cd1f6ae3bc6b',
		components: [{
			id: newComponent.id
		}]
	}).then(function(job) {
		console.log(`Printing ${job.id}`)
	})
})
```

## Methods

Please refer to the [full documentation](https://ideea.io/3ps/docs) for the full list of methods.

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
   machine: 'ender-3',
   material: 'pla-red',
   layer_height: '200',
   infill: '20',
   scale: 1,
}).then((component) => {
	console.log(component)
})
```

### TPS.jobs.create(job)
A job reprsents a request from a customer to print one or more componets. To create a job send an array of objects and compoents using method TPS.job.create().

```js
tps.jobs.create({
	group_id: '00ffedbb-ff29-5138-9b5d-cd1f6ae3bc6b',
	components: [{
		id: 'cead04bc-cf4f-402a-8e90-1f33669efa03'
	}]
}).then((job) => {
	console.log(`Printing Job: ${job.id}`)
})
```
