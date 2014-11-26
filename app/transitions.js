import Category from './models/category'
export default function() {
  this.transition(
	  // this.betweenModels({instanceOf: Category}),
   this.hasClass('liquid-category'),
    this.use('fade',  { delay: 0, duration: 400 })
    // this.withinRoute('retriever.site'),
    // this.use('toRight',  { delay: 80, duration: 800 })
  );
  this.transition(
    this.withinRoute('topics.topic.default'),
    this.use('toRight',  { delay: 80, duration: 800 })
  );
};
