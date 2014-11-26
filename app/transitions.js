export default function() {
  this.transition(
    this.withinRoute('topics.topic.default'),
    this.use('toRight',  { delay: 80, duration: 800 })
  );
};
