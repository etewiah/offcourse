export default function() {
  this.transition(
    this.withinRoute('topics.topic.default'),
    this.use('toUp',  { delay: 100, duration: 1000 })
  );
};
