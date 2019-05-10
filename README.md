<p align="center">
  <img width="192" src="https://ideea.io/static/img/logo-text.svg" alt="Ideea">
</p>

---

### [Ideea.io](https://ideea.io) &nbsp;&nbsp;&nbsp; [Getting Started](https://ideea.io/ideea) &nbsp;&nbsp;&nbsp; [Full Documentation](https://ideea.io/docs/3ps) &nbsp;&nbsp;&nbsp; [Cheat Sheet](https://github.com/Ideea-inc/ideea-js/blob/master/docs/cheat-sheet.md)

---

# 3PS JS SDK

This is the official SDK for the 3PS/TPS platform. You can use this SDK to manage objects and object groups, jobs, job groups and job events, and addresses

## Installation

```
$ npm install tps
```

## Getting Started

```js
const tps = require('TPS');
```

## Methods

This is not a complete list of methods. Please refer to the [full documentation](https://ideea.io/3ps/docs) for the full list of methods.

### objects.create(user_id, group_id)

Creates an object

```js
tps.objects.create(user_id, group_id).then(object => {
  console.log(object);
});
```

### objects.get(objectID)

Get object by objectID

```js
tps.objects.get('00ce6d6a-ea29-4840-9b5d-cd1f6ae3bc6b').then(object => {
  console.log(object);
});
```

### object.update(objectID, {groupID, groupID})

Updates a single object

```js
tps.objects.update(objectID, {userID, groupID}).then(object => {
  console.log(object);
});
```

### object.search(query)

Returns an array of objects that match the query

```js
tps.objects.search(query).then(objects=> {
  console.log(objects);
});
```

### object.delete(objectID)

Deletes a single object

```js
tps.objects.delete(objectID).then(object) => {
  console.log(object);
});
```

### object.star(objectID)

Stars an object

```js
tps.objects.star(objectID).then(object)
  console.log(object);
});
```

### object.getStarObjects()

Gets all stard objects

```js
tps.objects.getStarObjects().then(stars => {
  console.log(stars);
});
```
### object.unStar(objectID)

un-Stars a single object

```js
tps.objects.unStar(objectID).then(object) => {
  console.log(object);
});
```
### object.getTags(objectID)

Gets all tags that are assigned to the objectID

```js
tps.objects.getTags(objectID).then(tags => {
  console.log(tags);
});
```

### object.addTag(objectID, tagName)

Adds a single tag to an object. Can only have 5 tags per object.

```js
tps.objects.addTag(objectID, tagName).then(tag => {
  console.log(tag);
});
```
### object.deleteTag(objectID, tagID)

Deletes a single tag from an object

```js
tps.objects.deleteTag(objectID, tagID).then(numOfTagsDeleted => {
  console.log(numOfTagsDeleted);
});
```

### jobs.create(jobID, groupIdD

Creates a single job

```js
tps.jobs.create(jobID, groupID).then(job => {
  console.log(job);
});
```

### jobs.get(jobID)

Gets a single job

```js
tps.jobs.get(jobID).then(job => {
  console.log(job);
});
```

### jobs.getByGroupID(groupID)

Gets all jobs with the same group ID

```js
tps.jobs.getByGroupID(groupID).then(jobs => {
  console.log(jobs);
});
```

### jobs.createJobEvent(jobID, eventObj)

Creates an event for a job

```js
tps.jobs.createJobEvent(jobID, eventObj).then(event => {
  console.log(event);
});
```

### jobs.getJobEvents(jobID)

Get all job events

```js
tps.jobs.getJobEvents(jobID).then(events => {
  console.log(events);
});
```

### component.create({userID, groupID})

Creates a single component

```js
tps.component.create({userID, groupID}).then(component => {
  console.log(component);
});
```

### component.get(componentID)

Gets one component

```js
tps.component.get(componentID).then(component => {
  console.log(component);
});
```
### component.getStarComponents()

Gets all components that are star'd

```js
tps.component.getStarComponents().then(components => {
  console.log(components);
});
```


### component.download(componentID, versionNumber)

Downloads one component

```js
tps.component.download(componentID, versionNumber).then(download => {
    var win = window.open(download.url, '_blank');
    win.focus();
}
```

### component.update(componentID, {groupID, userID})

Updates a component

```js
tps.component.update(componentID, {groupID, userID}).then(component => {
  console.log(component);
});
```

### component.updateStl(objectID, StlData)

Updates a single components's stl

```js
tps.component.updateStl(objectID, stlDat).then(object => {
  console.log(object);
});
```

### component.deleteVersion(componentID, versionNumber)

Deletes a specific component version

```js
tps.component.deleteVersion(componentID, version).then(component => {
  console.log(component);
});
```

### component.delete(componentID)

Deletes a component

```js
tps.component.delete(component).then(component => {
  console.log(component);
});
```
### component.star(componentID)

Stars a component

```js
tps.component.star(component).then(component => {
  console.log(component);
});
```
### component.getStarComponents()

Gets all star'd components

```js
tps.component.getStarComponents().then(stars => {
  console.log(stars);
});
```

### component.unStar(componentID)

Un-stars a component

```js
tps.component.unStar(component).then(component => {
  console.log(component);
});
```

### addresses.create(addressObj)

Created an address

```js
tps.addresses.create(addressObj).then(address => {
  console.log(address);
});
```

### addresses.get(addressID)

Gets an address

```js
tps.addresses.get(addressID).then(address => {
  console.log(address);
});
```

### addresses.update(addressID, addressUpdatedObj)

Updates an address

```js
tps.addresses.update(addressID, addressUpdatedObj).then(address => {
  console.log(address);
});
```

### addresses.setDefault(addressID)

Makes an address default

```js
tps.addresses.setDefault(addressID).then(address => {
  console.log(address);
});
```

### addresses.getByGroupID(groupID)

Gets all addresses associated with the provided groupID

```js
tps.addresses.getByGroupID(groupID).then(addresses => {
  console.log(addresses);
});
```

### addresses.delete(addressID)

Deletes an address

```js
tps.addresses.delete(addressID).then(address => {
  console.log(address);
});
```
