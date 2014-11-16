// import DS from 'ember-data';

// export default DS.RESTAdapter.extend({
// });
export default EmberPouch.Adapter.extend({
  db: new PouchDB('offcoursedb')
});