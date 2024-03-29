(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
module.exports = getData;

function getData() {
  return {
    name: 'Overview',
    html: '\n<p>\nTo make great products:\n<b>do machine learning like the great engineer you are, not like the great machine learning\nexpert you aren\u2019t.</b>\n</p>\n<p>\nMost of the problems you will face are, in fact, engineering problems. Even with all the\nresources of a great machine learning expert, most of the gains come from great features, not\ngreat machine learning algorithms. So, the basic approach is:\n</p>\n<ol>\n  <li>make sure your pipeline is solid end to end</li>\n  <li>start with a reasonable objective</li>\n  <li>add common\xAD-sense features in a simple way</li>\n  <li>make sure that your pipeline stays solid.</li>\n</ol>\n<p>\nThis approach will make lots of money and/or make lots of people happy for a long period of\ntime. Diverge from this approach only when there are no more simple tricks to get you any\nfarther. Adding complexity slows future releases.\n</p>\n<p>\nOnce you\'ve exhausted the simple tricks, cutting\xADedge machine learning might indeed be in your\nfuture. See the section on Phase III machine learning projects.\n</p>\n<p> \nThis document is arranged in four parts:\n<ol>\n<li> <a class="first-part" data-path="0:0:0:0:0">The first part</a> should help you understand whether the time is right for building a machine learning system.</li>\n<li><a class="second-part" data-path="0:1">The second part</a> is about deploying your first pipeline.</li>\n<li><a class="third-part" data-path="0:2">The third part</a> is about launching and iterating while adding new features to your pipeline, how to evaluate models and training\xADserving skew.</li>\n<li><a class="fourth-part" data-path="0:3">The final part</a> is about what to do when you reach a plateau.</li>\n</ol>\n</p>\n ',
    children: [{
      startAngle: 0,
      endAngle: 0,
      children: [{
        startAngle: 0,
        endAngle: 0,
        children: [{
          startAngle: 0,
          endAngle: 0,
          children: [{
            startAngle: -Math.PI/2 - Math.PI/6,
            endAngle: -Math.PI/2 + Math.PI/6,
            name: 'Before Machine Learning',
            label: 'Before ML',
            renderToC: true,
            html: '\n    <p>\nThis part should help you understand whether the time is right for building a machine learning system.\n</p>\n    ',
            children: [{
              name: "Rule #1: Don’t be afraid to launch a product without machine learning.",
              html: '\n<p>Machine learning is cool, but it requires data. Theoretically, you can take data from a different problem and then tweak the model for a new product, but this will likely underperform basic heuristics. If you think that machine learning will give you a 100% boost, then a heuristic will get you 50% of the way there.</p>\n<p>\nFor instance, if you are ranking apps in an app marketplace, you could use the install rate or number of installs as heuristics. If you are detecting spam, filter out publishers that have sent spam before. Don\u2019t be afraid to use human editing either. If you need to rank contacts, rank the most recently used highest (or even rank alphabetically). If machine learning is not absolutely required for your product, don\'t use it until you have data.\n</p>\n        '
            }, { name: "Rule #2: First, design and implement metrics.",
              html: '\n    <p>\nBefore formalizing what your machine learning system will do, track as much as possible in your current system. Do this for the following reasons:\n</p>\n\n<ol>\n<li>It is easier to gain permission from the system\u2019s users earlier on.</li>\n<li>If you think that something might be a concern in the future, it is better to get historical data now.</li>\n<li>If you design your system with metric instrumentation in mind, things will go better for you in the future. Specifically, you don\u2019t want to find yourself grepping for strings in logs to instrument your metrics!</li>\n<li>You will notice what things change and what stays the same. For instance, suppose you want to directly optimize one\xAD-day active users. However, during your early manipulations of the system, you may notice that dramatic alterations of the user experience don\u2019t noticeably change this metric.</li>\n</ol>\n\n<p>\nGoogle Plus team measures expands per read, reshares per read, plus\xADones per read, comments/read, comments per user, reshares per user, etc. which they use in computing the goodness of a post at serving time. Also, note that an experiment framework, in which you can group users into buckets and aggregate statistics by experiment, is important. See\n<a href=\'#\' data-path=\'0:1:2:0\'>Rule #12.</a>\n</p>\n\n<p>\nBy being more liberal about gathering metrics, you can gain a broader picture of your system. Notice a problem? Add a metric to track it! Excited about some quantitative change on the last release? Add a metric to track it!\n</p>\n    ' }, 
            { name: "Rule #3: Choose machine learning over a complex heuristic.",
              html: '\n      <p>A simple heuristic can get your product out the door. A complex heuristic is unmaintainable. Once you have data and a basic idea of what you are trying to accomplish, move on to machine learning. As in most software engineering tasks, you will want to be constantly updating your approach, whether it is a heuristic or a machine\xADlearned model, and you will find that the machine\xAD-learned model is easier to update and maintain (see\n        <a href=\'#\' data-path=\'0:2:0:0\'>Rule #16</a>).</p>\n      '
            }]
          }]
        }]
      }]
    }, {
      name: 'ML Phase I',
      renderToC: true,
      html: 'This part is about deploying your first pipeline.',
      label: 'Deploy',
      children: [{
        name: 'Your First Pipeline',
        renderToC: true,
        html: '\n<p>\n    Focus on your system infrastructure for your first pipeline. While it is fun to think about all the imaginative machine learning you are going to do, it will be hard to figure out what is happening if you don\u2019t first trust your pipeline.\n</p>',
        children: [{ name: 'Rule #4: Keep the first model simple and get the infrastructure right.',
          html: '\n<p>\nThe first model provides the biggest boost to your product, so it doesn\'t need to be fancy. But you will run into many more infrastructure issues than you expect. Before anyone can use your fancy new machine learning system, you have to determine:\n</p> \n\n<ul>\n<li>How to get examples to your learning algorithm.</li>\n<li>A first cut as to what "good" and "bad" mean to your system.</li>\n<li>How to integrate your model into your application. You can either apply the model live, or pre\xADcompute the model on examples offline and store the results in a table. For example, you might want to pre\xADclassify web pages and store the results in a table, but you might want to classify chat messages live.</li>\n</ul>\n<p>\nChoosing simple features makes it easier to ensure that:\n</p>\n\n<ul>\n<li>The features reach your learning algorithm correctly.</li>\n<li>The model learns reasonable weights.</li>\n<li>The features reach your model in the server correctly.</li>\n</ul>\n\n<p>\nOnce you have a system that does these three things reliably, you have done most of the work. Your simple model provides you with baseline metrics and a baseline behavior that you can use to test more complex models. Some teams aim for a "neutral" first launch: a first launch that explicitly de\xADprioritizes machine learning gains, to avoid getting distracted.\n</p>\n        ' }, { name: 'Rule #5: Test the infrastructure independently from the machine learning.',
          html: '\n        <p>\nMake sure that the infrastructure is testable, and that the learning parts of the system are encapsulated so that you can test everything around it. Specifically:\n</p>\n\n<ol>\n<li>Test getting data into the algorithm. Check that feature columns that should be populated are populated. Where privacy permits, manually inspect the input to your training algorithm. If possible, check statistics in your pipeline in comparison to statistics for the same data processed elsewhere.</li>\n<li>Test getting models out of the training algorithm. Make sure that the model in your training environment gives the same score as the model in your serving environment (see <a href=\'#\' data-path=\'0:2:2:8\'>Rule #37</a> ).</li>\n</ol>\nMachine learning has an element of unpredictability, so make sure that you have tests for the code for creating examples in training and serving, and that you can load and use a fixed model during serving. Also, it is important to understand your data: see <a href=\'http://www.unofficialgoogledatascience.com/2016/10/practical-advice-for-analysis-of-large.html\'> Practical Advice for Analysis of Large, Complex Data Sets.</a>\'\n' }, { name: 'Rule #6: Be careful about dropped data when copying pipelines.',
          html: '\n<p>Often we create a pipeline by copying an existing pipeline (i.e., <a href=\'https://en.wikipedia.org/wiki/Cargo_cult_programming\'>cargo cult programming</a>),\n and the old pipeline drops data that we need for the new pipeline. For example, the pipeline for\n  Google Plus What\u2019s Hot drops older posts (because it is trying to rank fresh posts).\n  This pipeline was copied to use for Google Plus Stream, where older posts are still meaningful,\n  but the pipeline was still dropping old posts. Another common pattern is to only log data that was \n  seen by the user. Thus, this data is useless if we want to model why a particular post was not \n  seen by the user, because all the negative examples have been dropped. A similar issue occurred \n  in Play. While working on Play Apps Home, a new pipeline was created that also contained examples \n  from the landing page for Play Games without any feature to disambiguate where each example came from.\n</p>' }, { name: 'Rule #7: Turn heuristics into features, or handle them externally.',
          html: '\n<p>\nUsually the problems that machine learning is trying to solve are not completely new. \nThere is an existing system for ranking, or classifying, or whatever problem you are trying to solve. \nThis means that there are a bunch of rules and heuristics. \n<b>These same heuristics can give you a lift when tweaked with machine learning.</b> Your heuristics\nshould be mined for whatever information they have, for two reasons. First, the transition to a machine\n learned system will be smoother. Second, usually those rules contain a lot of the intuition about the \n system you don\u2019t want to throw away. There are four ways you can use an existing heuristic:\n</p>\n\n<ul>\n<li>Preprocess using the heuristic. If the feature is incredibly awesome, then this is an option. For example, if, in a spam filter, the sender has already been blacklisted, don\u2019t try to relearn what "blacklisted" means. Block the message. This approach makes the most sense in binary classification tasks.</li>\n<li>Create a feature. Directly creating a feature from the heuristic is great. For example, if you use a heuristic to compute a relevance score for a query result, you can include the score as the value of a feature. Later on you may want to use machine learning techniques to massage the value (for example, converting the value into one of a finite set of discrete values, or combining it with other features) but start by using the raw value produced by the heuristic.</li>\n<li>Mine the raw inputs of the heuristic. If there is a heuristic for apps that combines the number of installs, the number of characters in the text, and the day of the week, then consider pulling these pieces apart, and feeding these inputs into the learning separately. Some techniques that apply to ensembles apply here (see <a href=\'#\' data-path=\'0:3:0:2\'>Rule #40</a>).</li>\n<li>Modify the label. This is an option when you feel that the heuristic captures information not currently contained in the label. For example, if you are trying to maximize the number of downloads, but you also want quality content, then maybe the solution is to multiply the label by the average number of stars the app received. There is a lot of leeway here. See <a href=\'#\' data-path=\'0:1:2\'>"Your First Objective"</a>.</li>\n</ul>\n<p>\nDo be mindful of the added complexity when using heuristics in an ML system. Using old heuristics in your new machine learning algorithm can help to create a smooth transition, but think about whether there is a simpler way to accomplish the same effect.\n</p>\n' }]
      }, {
        name: 'Monitoring',
        renderToC: true,
        html: '<p>In general, practice good alerting hygiene, such as making alerts actionable and having a dashboard page.\n</p>',
        children: [{ name: 'Rule #8: Know the freshness requirements of your system.',
          html: '<p>How much does performance degrade if you have a model that is a day old? A week old? A quarter old? This information can help you to understand the priorities of your monitoring. If you lose significant product quality if the model is not updated for a day, it makes sense to have an engineer watching it continuously. Most ad serving systems have new advertisements to handle every day, and must update daily. For instance, if the ML model for Google Play Search is not updated, it can have a negative impact in under a month. Some models for What\u2019s Hot in Google Plus have no post identifier in their model so they can export these models infrequently. Other models that have post identifiers are updated much more frequently. Also notice that freshness can change over time, especially when feature columns are added or removed from your model.</p>' }, { name: 'Rule #9: Detect problems before exporting models.',
          html: '\n<p>Many machine learning systems have a stage where you export the model to serving. If there is an issue with an exported model, it is a user\xAD-facing issue.</p>\n<p>\n        Do sanity checks right before you export the model. Specifically, make sure that the model\u2019s performance is reasonable on held out data. \n        Or, if you have lingering concerns with the data, don\u2019t export a model.\n        Many teams continuously deploying models check the area under the ROC curve (or AUC) before exporting.\n        <b>Issues about models that haven\u2019t been exported require an e\xADmail alert, but issues on a user-facing\n        model may require a page</b>. So better to wait and be sure before impacting users.</p>' }, { name: 'Rule #10: Watch for silent failures.',
          html: '\n        <p>This is a problem that occurs more for machine learning systems than for other kinds of systems. Suppose that a particular table that is being joined is no longer being updated. The machine learning system will adjust, and behavior will continue to be reasonably good, decaying gradually. Sometimes you find tables that are months out of date, and a simple refresh improves performance more than any other launch that quarter! The coverage of a feature may change due to implementation changes: for example a feature column could be populated in 90% of the examples, and suddenly drop to 60% of the examples. Play once had a table that was stale for 6 months, and refreshing the table alone gave a boost of 2% in install rate. If you track statistics of the data, as well as manually inspect the data on occasion, you can reduce these kinds of failures.</p>' }, { name: 'Rule #11: Give feature sets owners and documentation.',
          html: '\n        <p>If the system is large, and there are many feature columns, know who created or is maintaining each feature column. If you find that the person who understands a feature column is leaving, make sure that someone has the information. Although many feature columns have descriptive names, it\'s good to have a more detailed description of what the feature is, where it came from, and how it is expected to help.</p>' }]
      }, {
        name: 'Your First Objective',
        renderToC: true,
        html: '\n        <p>You have many metrics, or measurements about the system that you care about,\n         but your machine learning algorithm will often require a single <b>objective, a number that your\n        algorithm is "trying" to optimize</b>. I distinguish here between objectives and metrics: a metric is any number that your system reports, which may or may not be important. \n        See also <a href=\'#\' data-path=\'0:0:0:0:0:1\'>Rule #2</a>.</p>',
        children: [{ name: 'Rule #12: Don’t overthink which objective you choose to directly optimize.',
          html: '\n<p>You want to make money, make your users happy, and make the world a better place. There are tons of metrics that you care about, and you should measure them all (see <a href=\'#\' data-path=\'0:0:0:0:0:1\'>Rule #2</a>). However, early in the machine learning process, you will notice them all going up, even those that you do not directly optimize. For instance, suppose you care about number of clicks and time spent on the site. If you optimize for number of clicks, you are likely to see the time spent increase.</p>\n\n<p>So, keep it simple and don\u2019t think too hard about balancing different metrics when you can still easily increase all the metrics. Don\u2019t take this rule too far though: do not confuse your objective with the ultimate health of the system (see <a href=\'#\' data-path=\'0:3:0:1\'>Rule #39</a>).\nAnd, <b>if you find yourself increasing the directly optimized metric, but deciding not to launch, some objective revision may be required</b>.</p>\n        ' }, { name: 'Rule #13: Choose a simple, observable and attributable metric for your first objective.',
          html: '\n        <p>Often you don\'t know what the true objective is. You think you do but then as\n        you stare at the data and side-by-side analysis of your old system and new ML\n        system, you realize you want to tweak the objective. Further, different team\n        members often can\'t agree on the true objective. <b>The ML objective should be\n        something that is easy to measure and is a proxy for the "true" objective.</b>\n        In fact, there is often no "true" objective (see\n        <a href="#" data-path=\'0:3:0:1\'>Rule#39</a>).\n        So\n        train on the simple ML objective, and consider having a "policy layer" on top\n        that allows you to add additional logic (hopefully very simple logic) to do\n        the final ranking.</p>\n        <p>The easiest thing to model is a user behavior that is directly observed and attributable to an\naction of the system:</p>\n<ul>\n<li>Was this ranked link clicked?</li>\n<li>Was this ranked object downloaded?</li>\n<li>Was this ranked object forwarded/replied to/e\xADmailed?</li>\n<li>Was this ranked object rated?</li>\n<li>Was this shown object marked as spam/pornography/offensive?</li>\n</ul>\n<p>Avoid modeling indirect effects at first:</p>\n<ul>\n<li>Did the user visit the next day?</li>\n<li>How long did the user visit the site?</li>\n<li>What were the daily active users?</li>\n</ul>\n<p>Indirect effects make great metrics, and can be used during A/B testing and during launch\ndecisions.</p>\n<p>Finally, don\u2019t try to get the machine learning to figure out:</p>\n<ul>\n<li>Is the user happy using the product?</li>\n<li>Is the user satisfied with the experience?</li>\n<li>Is the product improving the user\u2019s overall well\xADbeing?</li>\n<li>How will this affect the company\u2019s overall health?</li>\n</ul>\n<p>These are all important, but also incredibly hard to measure. Instead, use\nproxies: if the user is happy, they will stay on the site longer. If the user\nis satisfied, they will visit again tomorrow. Insofar as well-being and\ncompany health is concerned, human judgement is required to connect any\nmachine learned objective to the nature of the product you are selling and\nyour business plan.</p>\n' }, { name: 'Rule #14: Starting with an interpretable model makes debugging easier.',
          html: '\n        <p>Linear regression, logistic regression, and Poisson regression are directly\n        motivated by a probabilistic model. Each prediction is interpretable as a\n        probability or an expected value. This makes them easier to debug than models\n        that use objectives (zero\xAD-one loss, various hinge losses, and so on) that try\n        to directly optimize classification accuracy or ranking performance. For\n        example, if probabilities in training deviate from probabilities predicted in\n        side\xAD-by-\xADsides or by inspecting the production system, this deviation could\n        reveal a problem.</p>\n        <p>For example, in linear, logistic, or Poisson regression, <strong>there are subsets of\n        the data where the average predicted expectation equals the average label (1-\n        moment calibrated, or just calibrated)</strong>. This is true assuming that you have no\n        regularization and that your algorithm has converged, and it is approximately\n        true in general. If you have a feature which is either 1 or 0 for each example,\n        then the set of 3 examples where that feature is 1 is calibrated. Also, if you\n        have a feature that is 1 for every example, then the set of all examples is\n        calibrated.</p>\n        <p>With simple models, it is easier to deal with feedback loops (see\n          <a href="#" data-path=\'0:2:2:7\'>Rule #36</a>).\n          Often, we use these probabilistic predictions to make a decision: e.g. rank\n          posts in decreasing expected value (i.e. probability of click/download/etc.).\n          <strong>However, remember when it comes time to choose which model to use, the\n          decision matters more than the likelihood of the data given the model (see\n          <a href="#" data-path=\'0:2:1:4\'>Rule #27</a>).</strong></p>\n' }, { name: 'Rule #15: Separate Spam Filtering and Quality Ranking in a Policy Layer.',
          html: '\n        <p>Quality ranking is a fine art, but spam filtering is a war. The signals that\nyou use to determine high quality posts will become obvious to those who use\nyour system, and they will tweak their posts to have these properties. Thus,\nyour quality ranking should focus on ranking content that is posted in good\nfaith. You should not discount the quality ranking learner for ranking spam\nhighly. <strong>Similarly, "racy" content should be handled separately from Quality\nRanking.</strong> Spam filtering is a different story. You have to expect that the\nfeatures that you need to generate will be constantly changing. Often, there\nwill be obvious rules that you put into the system (if a post has more than\nthree spam votes, don\u2019t retrieve it, et cetera). Any learned model will have\nto be updated daily, if not faster. The reputation of the creator of the\ncontent will play a great role.</p>\n<p>At some level, the output of these two systems will have to be integrated. Keep\nin mind, filtering spam in search results should probably be more aggressive\nthan filtering spam in email messages. This is true assuming that you have no\nregularization and that your algorithm has converged. It is approximately true\nin general. Also, it is a standard practice to remove spam from the training\ndata for the quality classifier.</p>\n' }]
      }]
    }, {
      name: 'ML Phase II',
      label: 'Iterate',
      renderToC: true,
      html: '<p>This part is about launching and iterating while adding new features to your pipeline, how to evaluate models and training-serving skew.</p>',
      children: [{
        name: 'Feature Engineering',
        renderToC: true,
        html: '\n      <p>In the first phase of the lifecycle of a machine learning system, the\nimportant issues are to get the training data into the learning system, get any\nmetrics of interest instrumented, and create a serving infrastructure. <strong>After\nyou have a working end to end system with unit and system tests instrumented,\nPhase II begins.</strong></p>\n<p>In the second phase, there is a lot of low-hanging fruit. There are a variety\nof obvious features that could be pulled into the system. Thus, the second\nphase of machine learning involves pulling in as many features as possible and\ncombining them in intuitive ways. During this phase, all of the metrics should\nstill be rising. There will be lots of launches, and it is a great time to\npull in lots of engineers that can join up all the data that you need to\ncreate a truly awesome learning system.</p>',
        children: [{ name: 'Rule #16: Plan to launch and iterate.',
          html: '\n      <p>Don\u2019t expect that the model you are working on now will be the last one that\n      you will launch, or even that you will ever stop launching models. Thus\n      consider whether the complexity you are adding with this launch will slow down\n      future launches. Many teams have launched a model per quarter or more for\n      years. There are three basic reasons to launch new models:</p>\n      <ul>\n<li>You are coming up with new features.</li>\n<li>You are tuning regularization and combining old features in new ways.</li>\n<li>You are tuning the objective.</li>\n</ul>\n<p>Regardless, giving a model a bit of love can be good: looking over the data\nfeeding into the example can help find new signals as well as old, broken\nones. So, as you build your model, think about how easy it is to add or remove\nor recombine features. Think about how easy it is to create a fresh copy of\nthe pipeline and verify its correctness. Think about whether it is possible to\nhave two or three copies running in parallel. Finally, don\u2019t worry about\nwhether feature 16 of 35 makes it into this version of the pipeline. You\u2019ll\nget it next quarter.</p>'
        }, { name: 'Rule #17: Start with directly observed and reported features as opposed to learned features.',
          html: '\n      <p>This might be a controversial point, but it avoids a lot of pitfalls. First of\nall, let\u2019s describe what a learned feature is. A learned feature is a feature\ngenerated either by an external system (such as an unsupervised clustering\nsystem) or by the learner itself (e.g. via a factored model or deep learning).\nBoth of these can be useful, but they can have a lot of issues, so they should\nnot be in the first model.</p>\n<p>If you use an external system to create a feature, remember that the external\nsystem has its own objective. The external system\'s objective may be only weakly\ncorrelated with your current objective. If you grab a snapshot of the external\nsystem, then it can become out of date. If you update the features from the\nexternal system, then the meanings may change. If you use an external system to\nprovide a feature, be aware that this approach requires a great deal of care.</p>\n<p>The primary issue with factored models and deep models is that they are\nnon\xADconvex. Thus, there is no guarantee that an optimal solution can be\napproximated or found, and the local minima found on each iteration can be\ndifferent. This variation makes it hard to judge whether the impact of a\nchange to your system is meaningful or random. By creating a model without\ndeep features, you can get an excellent baseline performance. After this\nbaseline is achieved, you can try more esoteric approaches.</p>\n' }, { name: 'Rule #18: Explore with features of content that generalize across contexts.',
          html: '\n      <p>Often a machine learning system is a small part of a much bigger picture. For\n      example, if you imagine a post that might be used in What\u2019s Hot, many people\n      will plus-one, reshare, or comment on a post before it is ever shown in What\'s\n      Hot. If you provide those statistics to the learner, it can promote new posts\n      that it has no data for in the context it is optimizing.\n      YouTube Watch Next could use number of watches, or co-\n      watches (counts of how many times one video was watched after another was\n      watched) from YouTube search. You can also use explicit\n      user ratings. Finally, if you have a user action that you are using as a label,\n      seeing that action on the document in a different context can be a great\n      feature. All of these features allow you to bring new content into the context.\n      Note that this is not about personalization: figure out if someone likes the\n      content in this context first, then figure out who likes it more or less.</p>\n      ' }, { name: 'Rule #19: Use very specific features when you can.',
          html: '\n      <p>With tons of data, it is simpler to learn millions of simple features than a\n      few complex features. Identifiers of documents being retrieved and\n      canonicalized queries do not provide much generalization, but align your\n      ranking with your labels on head queries. Thus, don\u2019t be afraid of groups of\n      features where each feature applies to a very small fraction of your data, but\n      overall coverage is above 90%. You can use regularization to eliminate the\n      features that apply to too few examples.</p>' }, { name: 'Rule #20: Combine and modify existing features to create new features in human­-understandable ways.',
          html: '\n      <p>There are a variety of ways to combine and modify features. Machine learning\n      systems such as TensorFlow allow you to pre-process your data through\n      <a href="https://www.tensorflow.org/tutorials/linear#feature-columns-and-transformations">transformations</a>.\n      The two most standard approaches are "discretizations" and "crosses".</p>\n      <p>Discretization consists of taking a continuous feature and creating many\ndiscrete features from it. Consider a continuous feature such as age. You can\ncreate a feature which is 1 when age is less than 18, another feature which is\n1 when age is between 18 and 35, et cetera. Don\u2019t overthink the boundaries of\nthese histograms: basic quantiles will give you most of the impact.</p>\n<p>Crosses combine two or more feature columns. A feature column, in TensorFlow\'s\nterminology, is a set of homogenous features, (e.g. {male, female}, {US,\nCanada, Mexico}, et cetera). A cross is a new feature column with features in,\nfor example, {male, female} \xD7 {US,Canada, Mexico}. This new feature column\nwill contain the feature (male, Canada). If you are using TensorFlow and you\ntell TensorFlow to create this cross for you, this (male, Canada) feature will\nbe present in examples representing male Canadians. Note that it takes massive\namounts of data to learn models with crosses of three, four, or more base\nfeature columns.</p>\n<p>Crosses that produce very large feature columns may overfit. For instance,\nimagine that you are doing some sort of search, and you have a feature column\nwith words in the query, and you have a feature column with words in the\ndocument. You can combine these with a cross, but you will end up with a lot of\nfeatures (see <a href="#" data-path=\'0:2:0:5\'>Rule #21</a>).</p>\n<p>When working with text there are two alternatives. The most draconian is a\ndot product. A dot product in its simplest form simply counts the number of\nwords in common between the query and the document. This feature can then be\ndiscretized. Another approach is an intersection: thus, we will have a feature\nwhich is present if and only if the word "pony" is in both the document and the\nquery, and another feature which is present if and only if the word "the" is in\nboth the document and the query.</p>\n' }, { name: 'Rule #21: The number of feature weights you can learn in a linear model is roughly proportional to the amount of data you have.',
          html: '\n      <p>There are fascinating statistical learning theory results concerning the\n      appropriate level of complexity for a model, but this rule is basically all\n      you need to know. I have had conversations in which people were doubtful that\n      anything can be learned from one thousand examples, or that you would ever\n      need more than one million examples, because they get stuck in a certain method\n      of learning. The key is to scale your learning to the size of your data:</p>\n      <ol>\n<li>If you are working on a search ranking system, and there are millions\n   of different words in the documents and the query and you have 1000\n   labeled examples, then you should use a dot product between document\n   and query features, <a href="https://en.wikipedia.org/wiki/Tf%E2%80%93idf">TF-IDF</a>,\n   and a half_dozen other highly human_engineered\n   features. 1000 examples, a dozen features.</li>\n<li>If you have a million examples, then intersect the document and query\n   feature columns, using regularization and possibly feature selection.\n   This will give you millions of features, but with regularization you\n   will have fewer. Ten million examples, maybe a hundred thousand features.</li>\n<li>If you have billions or hundreds of billions of examples, you can cross\n   the feature columns with document and query tokens, using feature selection\n   and regularization. You will have a billion examples, and 10 million\n   features. Statistical learning theory rarely gives tight bounds, but gives\n   great guidance for a starting point.</li>\n</ol>\n<p>In the end, use\n<a href="#" data-path=\'0:2:1:5\'>Rule #28</a> to decide what features to use.</p>\n      ' }, { name: 'Rule #22: Clean up features you are no longer using.',
          html: '\n      <p>Unused features create technical debt. If you find that you are not using a\nfeature, and that combining it with other features is not working, then drop\nit out of your infrastructure. You want to keep your infrastructure clean so\nthat the most promising features can be tried as fast as possible. If\nnecessary, someone can always add back your feature.</p>\n<p>Keep coverage in mind when considering what features to add or keep. How many\nexamples are covered by the feature? For example, if you have some\npersonalization features, but only 8% of your users have any personalization\nfeatures, it is not going to be very effective.</p>\n<p>At the same time, some features may punch above their weight. For example, if\nyou have a feature which covers only 1% of the data, but 90% of the examples\nthat have the feature are positive, then it will be a great feature to add.</p>\n' }]
      }, {
        name: 'Human Analysis of the System',
        html: '<p>Before going on to the third phase of machine learning, it is important to\n      focus on something that is not taught in any machine learning class: how to\n      look at an existing model, and improve it. This is more of an art than a\n      science, and yet there are several anti\xADpatterns that it helps to avoid.</p>',
        renderToC: true,
        children: [{ name: 'Rule #23: You are not a typical end user.',
          html: '<p>This is perhaps the easiest way for a team to get bogged down. While there are\n      a lot of benefits to fishfooding (using a prototype within your team) and\n      dogfooding (using a prototype within your company), employees should look at\n      whether the performance is correct. While a change which is obviously bad\n      should not be used, anything that looks reasonably near production should be\n      tested further, either by paying laypeople to answer questions on a\n      crowdsourcing platform, or through a live experiment on real users.</p>\n      <p>There are two reasons for this. The first is that you are too close to the\ncode. You may be looking for a particular aspect of the posts, or you are\nsimply too emotionally involved (e.g. confirmation bias). The second is that\nyour time is too valuable. Consider the cost of nine engineers sitting in a one\nhour meeting, and think of how many contracted human labels that buys on a\ncrowdsourcing platform.</p>\n<p>If you really want to have user feedback, <strong>use user experience\nmethodologies</strong>. Create user personas (one description is in Bill Buxton\u2019s\n<a href="https://play.google.com/store/books/details/Bill_Buxton_Sketching_User_Experiences_Getting_the?id=2vfPxocmLh0C">Sketching User Experiences</a>)\nearly in a process and do usability testing (one\ndescription is in Steve Krug\u2019s\n<a href="https://play.google.com/store/books/details/Steve_Krug_Don_t_Make_Me_Think_Revisited?id=QlduAgAAQBAJ">Don\u2019t Make Me Think</a>)\nlater. User personas\ninvolve creating a hypothetical user. For instance, if your team is all male,\nit might help to design a 35-year-old female user persona (complete with user\nfeatures), and look at the results it generates rather than 10 results for\n25-to-40 year old males. Bringing in actual people to watch their reaction to\nyour site (locally or remotely) in usability testing can also get you a fresh\nperspective.</p>' }, { name: 'Rule #24: Measure the delta between models.',
          html: '<p>One of the easiest and sometimes most useful measurements you can make before\n      any users have looked at your new model is to calculate just how different the\n      new results are from production. For instance, if you have a ranking problem,\n      run both models on a sample of queries through the entire system, and look at\n      the size of the symmetric difference of the results (weighted by ranking\n      position). If the difference is very small, then you can tell without running\n      an experiment that there will be little change. If the difference is very\n      large, then you want to make sure that the change is good. Looking over\n      queries where the symmetric difference is high can help you to understand\n      qualitatively what the change was like. Make sure, however, that the system is\n      stable. Make sure that a model when compared with itself has a low (ideally\n      zero) symmetric difference.</p>' }, { name: 'Rule #25: When choosing models, utilitarian performance trumps predictive power.',
          html: '\n      <p>Your model may try to predict click-through rate. However, in the end, the key\nquestion is what you do with that prediction. If you are using it to rank\ndocuments, then the quality of the final ranking matters more than the\nprediction itself. If you predict the probability that a document is spam and\nthen have a cutoff on what is blocked, then the precision of what is allowed\nthrough matters more. Most of the time, these two things should be in\nagreement: when they do not agree, it will likely be on a small gain. Thus, if\nthere is some change that improves log loss but degrades the performance of\nthe system, look for another feature. When this starts happening more often,\nit is time to revisit the objective of your model.</p>' }, { name: 'Rule #26: Look for patterns in the measured errors, and create new features.',
          html: '\n      <p>Suppose that you see a training example that the model got "wrong". In a\nclassification task, this error could be a false positive or a false negative.\nIn a ranking task, the error could be a pair where a positive was ranked lower\nthan a negative. The most important point is that this is an example that the\nmachine learning system knows it got wrong and would like to fix if given the\nopportunity. If you give the model a feature that allows it to fix the error,\nthe model will try to use it.</p>\n<p>On the other hand, if you try to create a feature based upon examples the\nsystem doesn\u2019t see as mistakes, the feature will be ignored. For instance,\nsuppose that in Play Apps Search, someone searches for "free games". Suppose\none of the top results is a less relevant gag app. So you create a feature for\n"gag apps". However, if you are maximizing number of installs, and people\ninstall a gag app when they search for free games, the "gag apps" feature\nwon\u2019t have the effect you want.</p>\n<p>Once you have examples that the model got wrong, look for trends that are\noutside your current feature set. For instance, if the system seems to be\ndemoting longer posts, then add post length. Don\u2019t be too specific about the\nfeatures you add. If you are going to add post length, don\u2019t try to guess what\nlong means, just add a dozen features and the let model figure out what to do\nwith them (see\n<a href="#" data-path=\'0:2:0:5\'>Rule #21</a>\n). That is the easiest way to get what you want.</p>' }, { name: 'Rule #27: Try to quantify observed undesirable behavior.',
          html: '\n      <p>Some members of your team will start to be frustrated with properties of the\nsystem they don\u2019t like which aren\u2019t captured by the existing loss function. At\nthis point, they should do whatever it takes to turn their gripes into solid\nnumbers. For example, if they think that too many "gag apps" are being shown\nin Play Search, they could have human raters identify gag apps. (You can\nfeasibly use human\xADlabelled data in this case because a relatively small\nfraction of the queries account for a large fraction of the traffic.) If your\nissues are measurable, then you can start using them as features, objectives,\nor metrics. The general rule is "<strong>measure first, optimize second</strong>".</p>' }, { name: 'Rule #28: Be aware that identical short­term behavior does not imply identical long­term behavior',
          html: '\n      <p>Imagine that you have a new system that looks at every doc_id and exact_query,\n      and then calculates the probability of click for every doc for every query.\n      You find that its behavior is nearly identical to your current system in both\n      side by sides and A/B testing, so given its simplicity, you launch it.\n      However, you notice that no new apps are being shown. Why? Well, since your\n      system only shows a doc based on its own history with that query, there is no\n      way to learn that a new doc should be shown.</p>\n      <p>The only way to understand how such a system would work long-term is to have\nit train only on data acquired when the model was live. This is very\ndifficult.</p>\n      ' }]
      }, {
        name: 'Training­-Serving Skew',
        renderToC: true,
        html: '\n      <p>Training-serving skew is a difference between performance during training and\n      performance during serving. This skew can be caused by:</p>\n      <ul>\n<li>A discrepancy between how you handle data in the training and serving pipelines.</li>\n<li>A change in the data between when you train and when you serve.</li>\n<li>A feedback loop between your model and your algorithm.</li>\n</ul>\n<p>We have observed production machine learning systems at Google with training-\nserving skew that negatively impacts performance. The best solution is to\nexplicitly monitor it so that system and data changes don\u2019t introduce skew\nunnoticed.</p>\n      ',
        children: [{ name: 'Rule #29: The best way to make sure that you train like you serve is to save the set of features used at serving time, and then pipe those features to a log to use them at training time.',
          html: '\n      <p>Even if you can\u2019t do this for every example, do it for a small fraction, such\n      that you can verify the consistency between serving and training (see\n      <a href="#" data-path=\'0:2:2:8\'>Rule #37</a>). Teams that have made this\n      measurement at Google were sometimes surprised by the results.\n      YouTube home page\n      switched to logging features at serving time with significant quality\n      improvements and a reduction in code complexity, and many teams are switching\n      their infrastructure as we speak.</p> \n      ' }, { name: 'Rule #30: Importance-weight sampled data, don’t arbitrarily drop it!',
          html: '\n      <p>When you have too much data, there is a temptation to take files 1-12, and\nignore files 13-99. This is a mistake. Although data that was\nnever shown to the user can be dropped, importance weighting is best for the\nrest. Importance weighting means that if you decide that you are going to\nsample example X with a 30% probability, then give it a weight of 10/3. <strong>With\nimportance weighting, all of the calibration properties discussed in\n<a href="#" data-path=\'0:1:2:2\'>Rule #14</a>\nstill hold.</strong></p>\n' }, { name: 'Rule #31: Beware that if you join data from a table at training and serving time, the data in the table may change.',
          html: '<p>Say you join doc ids with a table containing features for those docs (such as\n        number of comments or clicks). Between training and serving time, features in\n        the table may be changed. Your model\'s prediction for the same document may\n        then differ between training and serving. The easiest way to avoid this sort\n        of problem is to log features at serving time (see\n        <a href="#" data-path=\'0:2:2:3\'>Rule #32</a>\n        ). If the table is\n        changing only slowly, you can also snapshot the table hourly or daily to get\n        reasonably close data. Note that this still doesn\u2019t completely resolve the\n        issue.</p>' }, { name: 'Rule #32: Re­use code between your training pipeline and your serving pipeline whenever possible.',
          html: '<p>Batch processing is different than online processing. In online processing,\n      you must handle each request as it arrives (e.g. you must do a separate lookup\n      for each query), whereas in batch processing, you can combine tasks (e.g.\n      making a join). At serving time, you are doing online processing, whereas\n      training is a batch processing task. However, there are some things that you\n      can do to re-use code. For example, you can create an object that is\n      particular to your system where the result of any queries or joins can be\n      stored in a very human readable way, and errors can be tested easily. Then,\n      once you have gathered all the information, during serving or training, you\n      run a common method to bridge between the human-readable object that is\n      specific to your system, and whatever format the machine learning system\n      expects. <strong>This eliminates a source of training-serving skew</strong>. As a\n      corollary, try not to use two different programming languages between training\n      and serving. That decision will make it nearly impossible for you to share\n      code.</p>' }, { name: 'Rule #33: If you produce a model based on the data until January 5th, test the model on the data from January 6th and after.',
          html: '\n      <p>In general, measure performance of a model on the data gathered after the data\nyou trained the model on, as this better reflects what your system will do in\nproduction. If you produce a model based on the data until January 5th, test\nthe model on the data from January 6th. You will expect that the performance\nwill not be as good on the new data, but it shouldn\u2019t be radically worse.\nSince there might be daily effects, you might not predict the average click\nrate or conversion rate, but the area under the curve, which represents the\nlikelihood of giving the positive example a score higher than a negative\nexample, should be reasonably close.</p>' }, { name: 'Rule #34: In binary classification for filtering (such as spam detection or determining interesting e­mails), make small short­term sacrifices in performance for very clean data.',
          html: '<p>In a filtering task, examples which are marked as negative are not shown to\n      the user. Suppose you have a filter that blocks 75% of the negative examples\n      at serving. You might be tempted to draw additional training data from the\n      instances shown to users. For example, if a user marks an email as spam that\n      your filter let through, you might want to learn from that.</p>\n      <p>But this approach introduces sampling bias. You can gather cleaner data if\ninstead during serving you label 1% of all traffic as "held out", and send all\nheld out examples to the user. Now your filter is blocking at least 74% of the\nnegative examples. These held out examples can become your training data.</p>\n<p>Note that if your filter is blocking 95% of the negative examples or more, this\napproach becomes less viable. Even so, if you wish to measure serving\nperformance, you can make an even tinier sample (say 0.1% or 0.001%). Ten\nthousand examples is enough to estimate performance quite accurately.</p>' }, { name: 'Rule #35: Beware of the inherent skew in ranking problems.',
          html: '\n      <p>When you switch your ranking algorithm radically enough that different results\nshow up, you have effectively changed the data that your algorithm is going to\nsee in the future. This kind of skew will show up, and you should design your\nmodel around it. There are multiple different approaches. These approaches are\nall ways to favor data that your model has already seen.</p>\n<ol>\n<li>Have higher regularization on features that cover more queries as opposed to\n   those features that are on for only one query. This way, the model will favor\n   features that are specific to one or a few queries over features that\n   generalize to all queries. This approach can help prevent very popular\n   results from leaking into irrelevant queries. Note that this is opposite the\n   more conventional advice of having more regularization on feature columns\n   with more unique values.</li>\n<li>Only allow features to have positive weights. Thus, any good feature will be\n   better than a feature that is "unknown".</li>\n<li>Don\u2019t have document-only features. This is an extreme version of #1. For\n   example, even if a given app is a popular download regardless of what the\n   query was, you don\u2019t want to show it everywhere. Not having document-only\n   features keeps that simple. The reason you don\u2019t want to show a specific\n   popular app everywhere has to do with the importance of\n   making all the desired apps reachable. For instance, if someone searches for\n   "bird watching app", they might download "angry birds", but that certainly\n   wasn\u2019t their intent. Showing such an app might improve download rate, but\n   leave the user\u2019s needs ultimately unsatisfied.</li>\n</ol>' }, { name: 'Rule #36: Avoid feedback loops with positional features.',
          html: '<p>The position of content dramatically affects how likely the user is to interact\n      with it. If you put an app in the first position it will be clicked more often,\n      and you will be convinced it is more likely to be clicked. One way to deal with\n      this is to add positional features, i.e. features about the position of the\n      content in the page. You train your model with positional features, and it\n      learns to weight, for example, the feature "1st\xADposition" heavily. Your model\n      thus gives less weight to other factors for examples with "1st\xADposition=true".\n      Then at serving you don\'t give any instances the positional feature, or you give\n      them all the same default feature, because you are scoring candidates before you\n      have decided the order in which to display them.</p>,\n      <p>Note that it is important to keep any positional features somewhat separate from\nthe rest of the model because of this asymmetry between training and testing.\nHaving the model be the sum of a function of the positional features and a\nfunction of the rest of the features is ideal. For example, don\u2019t cross the\npositional features with any document feature.</p>' }, { name: 'Rule #37: Measure Training/Serving Skew.',
          html: '<p>There are several things that can cause skew in the most general sense.\n      Moreover, you can divide it into several parts:</p>\n      <ul>\n<li>The difference between the performance on the training data and the holdout\n   data. In general, this will always exist, and it is not always bad.</li>\n<li>The difference between the performance on the holdout data and the "next\xADday"\n   data. Again, this will always exist. You should tune your regularization to\n   maximize the next-day performance. However, large drops in performance\n   between holdout and next-day data may indicate that some features are\n   time-sensitive and possibly degrading model performance.</li>\n<li>The difference between the performance on the "next-day" data and the live\n   data. If you apply a model to an example in the training data and the same\n   example at serving, it should give you exactly the same result (see\n   <a href="#" data-path=\'0:1:0:1\'>Rule #5</a>).\n   Thus, a discrepancy here probably indicates an engineering error.</li>\n</ul>' }]
      }]
    }, {
      name: 'ML Phase III',
      label: 'Explore',
      renderToC: true,
      html: '<p>The final part is about what to do when you reach a plateau.</p>',
      children: [{
        name: 'Slowed Growth, Optimization Refinement, and Complex Models',
        renderToC: true,
        html: '<p>There will be certain indications that the second phase is reaching a close.\n      First of all, your monthly gains will start to diminish. You will start to have\n      tradeoffs between metrics: you will see some rise and others fall in some\n      experiments. This is where it gets interesting. Since the gains are harder to\n      achieve, the machine learning has to get more sophisticated. A caveat: this\n      section has more blue-sky rules than earlier sections. We have seen many teams\n      go through the happy times of Phase I and Phase II machine learning. Once Phase\n      III has been reached, teams have to find their own path.</p>',
        children: [{ name: 'Rule #38: Don’t waste time on new features if unaligned objectives have become the issue.',
          html: '\n      <p>As your measurements plateau, your team will start to look at issues that are\noutside the scope of the objectives of your current machine learning system. As\nstated before, if the product goals are not covered by the existing algorithmic\nobjective, you need to change either your objective or your product goals. For\ninstance, you may optimize clicks, plus-ones, or downloads, but make launch\ndecisions based in part on human raters.</p>' }, { name: 'Rule #39: Launch decisions are a proxy for long-term product goals.',
          html: '<p>Alice has an idea about reducing the logistic loss of predicting installs. She\n      adds a feature. The logistic loss drops. When she does a live experiment, she\n      sees the install rate increase. However, when she goes to a launch review\n      meeting, someone points out that the number of daily active users drops by 5%.\n      The team decides not to launch the model. Alice is disappointed, but now\n      realizes that launch decisions depend on multiple criteria, only some of which\n      can be directly optimized using ML.</p>\n      <p>The truth is that the real world is not dungeons and dragons: there are no "hit\npoints" identifying the health of your product. The team has to use the\nstatistics it gathers to try to effectively predict how good the system will be\nin the future. They need to care about engagement, 1 day active users (DAU), 30\nDAU, revenue, and advertiser\u2019s return on investment. These metrics that are\nmeasureable in A/B tests in themselves are only a proxy for more long\xADterm\ngoals: satisfying users, increasing users, satisfying partners, and profit,\nwhich even then you could consider proxies for having a useful, high quality\nproduct and a thriving company five years from now.</p>\n<p><strong>The only easy launch decisions are when all metrics get better (or at least do\n  not get worse).</strong> If the team has a choice between a sophisticated machine\n  learning algorithm, and a simple heuristic, if the simple heuristic does a\n  better job on all these metrics, it should choose the heuristic. Moreover, there\n  is no explicit ranking of all possible metric values. Specifically, consider the\n  following two scenarios:</p>\n  <div><table>\n<thead>\n<tr>\n<th>Experiment</th>\n<th>Daily Active Users</th>\n<th>Revenue/Day</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>A</td>\n<td>1 million</td>\n<td>$4 million</td>\n</tr>\n<tr>\n<td>B</td>\n<td>2 million</td>\n<td>$2 million</td>\n</tr>\n</tbody>\n</table></div>\n<p>If the current system is A, then the team would be unlikely to switch to B. If\nthe current system is B, then the team would be unlikely to switch to A. This\nseems in conflict with rational behavior; however, predictions of changing\nmetrics may or may not pan out, and thus there is a large risk involved with\neither change. Each metric covers some risk with which the team is concerned.</p>\n<p>Moreover, no metric covers the team\u2019s ultimate concern, "where is my product\ngoing to be five years from now"?</p>\n<p><strong>Individuals, on the other hand, tend to favor one objective that they can\ndirectly optimize.</strong> Most machine learning tools favor such an environment. An\nengineer banging out new features can get a steady stream of launches in such an\nenvironment. There is a type of machine learning, multi-objective learning,\nwhich starts to address this problem. For instance, one can formulate a\nconstraint satisfaction problem that has lower bounds on each metric, and\noptimizes some linear combination of metrics. However, even then, not all\nmetrics are easily framed as machine learning objectives: if a document is\nclicked on or an app is installed, it is because that the content was shown. But\nit is far harder to figure out why a user visits your site. How to predict the\nfuture success of a site as a whole is\n<a href="https://en.wikipedia.org/wiki/AI-complete">AI-complete</a>: as hard as computer\nvision or natural language processing.</p>\n      ' }, { name: 'Rule #40: Keep ensembles simple.',
          html: '<p>Unified models that take in raw features and directly rank content are the\n      easiest models to debug and understand. However, an ensemble of models (a\n      "model" which combines the scores of other models) can work better. <strong>To keep\n      things simple, each model should either be an ensemble only taking the input of\n      other models, or a base model taking many features, but not both.</strong> If you have\n      models on top of other models that are trained separately, then combining them\n      can result in bad behavior.</p>\n      <p>Use a simple model for ensembling that takes only the output of your "base"\nmodels as inputs. You also want to enforce properties on these ensemble models.\nFor example, an increase in the score produced by a base model should not\ndecrease the score of the ensemble. Also, it is best if the incoming models are\nsemantically interpretable (for example, calibrated) so that changes of the\nunderlying models do not confuse the ensemble model. Also, <strong>enforce that an\nincrease in the predicted probability of an underlying classifier does not\ndecrease the predicted probability of the ensemble</strong>.</p>' }, { name: 'Rule #41: When performance plateaus, look for qualitatively new sources of information to add rather than refining existing signals.',
          html: '<p>You\u2019ve added some demographic information about the user. You\'ve added some\n      information about the words in the document. You have gone through template\n      exploration, and tuned the regularization. You haven\u2019t seen a launch with more\n      than a 1% improvement in your key metrics in a few quarters. Now what?</p>\n      <p>It is time to start building the infrastructure for radically different\nfeatures, such as the history of documents that this user has accessed in the\nlast day, week, or year, or data from a different property. Use\n<a href="https://en.wikipedia.org/wiki/Wikidata">wikidata</a>\nentities or something internal to your company (such as Google\u2019s\n<a href="https://en.wikipedia.org/wiki/Knowledge_Graph">knowledge graph</a>). Use deep\nlearning. Start to adjust your expectations on how much return\nyou expect on investment, and expand your efforts accordingly. As in any\nengineering project, you have to weigh the benefit of adding new features\nagainst the cost of increased complexity.</p>' }, { name: 'Rule #42: Don’t expect diversity, personalization, or relevance to be as correlated with popularity as you think they are.',
          html: '\n      <p>Diversity in a set of content can mean many things, with the diversity of the\nsource of the content being one of the most common. Personalization implies each\nuser gets their own results. Relevance implies that the results for a particular\nquery are more appropriate for that query than any other. Thus all three of\nthese properties are defined as being different from the ordinary.</p>\n<p>The problem is that the ordinary tends to be hard to beat.</p>\n<p>Note that if your system is measuring clicks, time spent, watches, +1s,\nreshares, et cetera, you are measuring the <strong>popularity</strong> of the content. Teams\nsometimes try to learn a personal model with diversity. To personalize, they add\nfeatures that would allow the system to personalize (some features representing\nthe user\u2019s interest) or diversify (features indicating if this document has any\nfeatures in common with other documents returned, such as author or content),\nand find that those features get less weight (or sometimes a different sign)\nthan they expect.</p>\n<p>This doesn\u2019t mean that diversity, personalization, or relevance aren\u2019t valuable.\nAs pointed out in the previous rule, you can do post\xADprocessing to increase\ndiversity or relevance. If you see longer term objectives increase, then you can\ndeclare that diversity/relevance is valuable, aside from popularity. You can\nthen either continue to use your post\xADprocessing, or directly modify the\nobjective based upon diversity or relevance.</p>' }, { name: 'Rule #43: Your friends tend to be the same across different products. Your interests tend not to be.',
          html: '\n      <p>Teams at Google have gotten a lot of traction from taking a model predicting the\ncloseness of a connection in one product, and having it work well on another.\nYour friends are who they are. On the other hand, I have watched several teams\nstruggle with personalization features across product divides. Yes, it seems\nlike it should work. For now, it doesn\u2019t seem like it does. What has sometimes\nworked is using raw data from one property to predict behavior on another. Also,\nkeep in mind that even knowing that a user has a history on another property can\nhelp. For instance, the presence of user activity on two products may be\nindicative in and of itself.</p>' }]
      }]
    }] };
}

},{}],2:[function(require,module,exports){
/**
 * Copyright 2018 Andrei Kashcha (http://github.com/anvaka)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies
 * or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
module.exports = getSunBurstPath;

/**
 * For a given tree, builds SVG path that renders SunBurst
 * diagram
 *
 * @param {Object} tree - a regular javascript object with single
 * property: tree.children - array of tree-children.
 *
 * @param {Object} options - see below.
 */
function getSunBurstPath(tree, options) {
  // TODO: Validate options
  options = options || {};

  // Radius of the inner circle.
  var initialRadius = getNumber(options.initialRadius, 100);
  // width of a single level
  var levelStep = getNumber(options.levelStep, 10);
  // Array of colors. Applied only on the top level.
  var colors = options.colors;
  if (!colors) colors = ['#f2ad52', '#e99e9b', '#ed684c', '#c03657', '#642b1c', '#132a4e'];

  // Initial rotation of the circle in radians.
  var startAngle = getNumber(options.startAngle, 0);

  var wrap = options.wrap;
  var stroke = options.stroke;
  var strokeWidth = options.strokeWidth;
  var beforeArcClose = options.beforeArcClose;
  var beforeLabelClose = options.beforeLabelClose;

  // Below is implementation.
  countLeaves(tree);

  var svgElements = [];
  var defs = [];
  svgElements.push(circle(initialRadius));
  if (options.centerText) {
    svgElements.push('<text text-anchor="middle" class="center-text" y="8">' + options.centerText + '</text>');
  }

  var path = '0';
  tree.path = path; // TODO: Don't really need to do this?

  drawChildren(startAngle, Math.PI * 2 + startAngle, tree);

  var sunBurstPaths = svgElements.join('\n');

  if (wrap) {
    return wrapIntoSVG(sunBurstPaths);
  }

  return sunBurstPaths;

  function wrapIntoSVG(paths) {
    var depth = getDepth(tree, 0);
    var min = depth * levelStep + initialRadius;
    var markup = '<svg viewBox="' + [-min, -min, min * 2, min * 2].join(' ') + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">';
    if (defs.length) {
      markup += '<defs>' + defs.join('\n') + '</defs>';
    }
    markup += '<g id="scene">' + paths + '</g>' + '</svg>';
    return markup;
  }

  function drawChildren(startAngle, endAngle, tree) {
    if (!tree.children) return;

    var level = tree.path.split(':').length - 1; // TODO: need a better structure to store path?
    var arcLength = Math.abs(startAngle - endAngle);
    var totalLeaves = 0;
    // In first pass, we get a sense of distribution of arc lengths at this level
    tree.children.forEach(function(child) {
      if (child.startAngle === undefined && child.endAngle === undefined) {
        totalLeaves += child.leaves;
      }
    });

    tree.children.forEach(function (child, i) {
      var endAngle, thisStartAngle;
      if (child.startAngle === undefined && child.endAngle === undefined) {
        thisStartAngle = startAngle;
        endAngle = startAngle + arcLength * child.leaves / totalLeaves;
        startAngle = endAngle;
      } else {
        thisStartAngle = child.startAngle;
        endAngle = child.endAngle;
        // TODO: What should I do with elements that are based on leaves?
      }

      child.path = tree.path + ':' + i;

      if (thisStartAngle !== endAngle) {
        var arcPath = pieSlice(initialRadius + level * levelStep, levelStep, thisStartAngle, endAngle);
        svgElements.push(arc(arcPath, child, i));

        if (child.label) {
          var key = child.path.replace(/:/g, '_');
          
          var textPath = 0 < thisStartAngle && thisStartAngle < Math.PI ? 
            arcSegment(
              initialRadius + (level  + 0.5)* levelStep,
              endAngle, thisStartAngle,
              0
            ) :
             arcSegment(
              initialRadius + (level  + 0.5)* levelStep,
              thisStartAngle, endAngle,
              1
            );
          console.log(Math.abs(thisStartAngle - endAngle), thisStartAngle, child.label);

          var pathMarkup = '<path d="' + textPath.d + '" id="' + key + '"></path>';
          defs.push(pathMarkup)

          var customAttributes = beforeLabelClose(child);
          var textAttributes = (customAttributes && convertToAttributes(customAttributes.text)) || '';
          var textPathAttributes = (customAttributes && convertToAttributes(customAttributes.textPath)) || '';
          var labelSVGContent = '<text class="label" ' + textAttributes + '>';
          labelSVGContent += '<textPath startOffset="50%" text-anchor="middle" xlink:href="#' + 
            key + '" ' + textPathAttributes + '>' + child.label + '</textPath></text>'
          svgElements.push(labelSVGContent);
        }
      }

      drawChildren(thisStartAngle, endAngle, child);
    });
  }

  function getColor(element) {
    if (element.color) return element.color;

    var path = element.path.split(':'); // yeah, that's bad. Need a better structure. Array maybe?

    return colors[path[1] % colors.length];
  }

  function arc(pathData, child, i) {
    var color = getColor(child, i);
    var pathMarkup = '<path d="' + pathData + '" fill="' + color + '" data-path="' + child.path + '" ';

    if (stroke) {
      pathMarkup += ' stroke="' + stroke +'" ';
    }

    if (strokeWidth) {
      pathMarkup += ' stroke-width="' + strokeWidth + '" ';
    }
    if (beforeArcClose) {
      pathMarkup += convertToAttributes(beforeArcClose(child));
    }

    pathMarkup += '></path>'


    return pathMarkup;
  }
}

function convertToAttributes(obj) {
  if (!obj) return '';
  var bagOfAttributes = [];

  Object.keys(obj).forEach(function(key) {
    bagOfAttributes.push(key + '="' + obj[key] + '"');

  });
  return bagOfAttributes.join(' ');
}

function polarToCartesian(centerX, centerY, radius, angle) {
  return {
    x: centerX + radius * Math.cos(angle),
    y: centerY + radius * Math.sin(angle)
  };
}

function arcSegment(radius, startAngle, endAngle, forward) {
  var cx = 0;
  var cy = 0;

  forward = forward ? 1 : 0;
  var start = polarToCartesian(cx, cy, radius, startAngle);
  var end = polarToCartesian(cx, cy, radius, endAngle);
  var da = Math.abs(startAngle - endAngle);
  var flip = da > Math.PI ? 1 : 0;
  var d = ["M", start.x, start.y, "A", radius, radius, 0, flip, forward, end.x, end.y].join(" ");

  return {
    d: d,
    start: start,
    end: end
  };
}

function pieSlice(r, width, startAngle, endAngle) {
  var inner = arcSegment(r, startAngle, endAngle, 1);
  var out = arcSegment(r + width, endAngle, startAngle, 0);
  return inner.d + 'L' + out.start.x + ' ' + out.start.y + out.d + 'L' + inner.start.x + ' ' + inner.start.y;
}

function circle(r) {
  // TODO: Don't hard-code fill?
  return '<circle r=' + r + ' cx=0 cy=0 fill="#fafafa" data-path="0"></circle>';
}

function countLeaves(treeNode) {
  if (treeNode.leaves) return treeNode.leaves;

  var leaves = 0;
  if (treeNode.children) {
    treeNode.children.forEach(function (child) {
      leaves += countLeaves(child);
    });
  } else {
    leaves = 1;
  }
  treeNode.leaves = leaves;
  return leaves;
}

function getDepth(tree) {
  var maxDepth = 0;

  visit(tree, 0);

  return maxDepth;


  function visit(tree, depth) {
    if (tree.children) {
      tree.children.forEach(function(child) {
        visit(child, depth + 1);
      });
    }
    if (depth > maxDepth) maxDepth = depth;
  }
}

function getNumber(x, defaultNumber) {
  return Number.isFinite(x) ? x : defaultNumber;
}

},{}],3:[function(require,module,exports){
var onClap = require('clap.js');
var colors = ['#58A55C', '#5186EC', '#D95040', '#F2BD42'];
var levelStep = 42;
var initialRadius = 100;
var getData = require('./data.js');
var tree = {
  children: [getData()],
  path: '0',
};

var orderedChildren = makeOrderedChildren(tree);
var getSunBurstPath = require('./get-sunburst-path.js');

var sceneContent = getSunBurstPath(tree.children[0], {
  wrap: true,
  colors: colors,
  levelStep: levelStep,
  initialRadius: initialRadius,
  // Rotate it a bit, so that part 0 starts at the top.
  startAngle: -Math.PI / 2,
  stroke: 'white',
  centerText: 'Click Here',
  beforeArcClose: beforeArcClose,
  beforeLabelClose: beforeLabelClose
});

var scene = document.body.querySelector('.diagram-container');
scene.innerHTML = sceneContent;

var tooltipManager = createTooltipManager(document.querySelector('.tooltip'));
var textReader = createTextReader(document.querySelector('.content'));

document.body.addEventListener('mousemove', handleMouseMove);
onClap(document.body, handleMouseClick);
// document.body.addEventListener('click', handleMouseClick);
document.querySelector('.close').addEventListener('click', closeDetails);

function closeDetails() {
  textReader.hide();
}

function beforeArcClose(child) {
  var level = child.path.split(':').length;
  return {
    'class': 'arc level-' + level
  }
}

function beforeLabelClose() {
  return {
    text: {
      dy: 5,
      fill: 'white'
    }
  }
}

function handleMouseClick(e) {
  var path = e.target.getAttribute('data-path');
  if (!path) {
    return;
  }
  e.preventDefault();

  var treeElement = getTreeElementByPath(path);
  textReader.show(treeElement);
  tooltipManager.hide();
}

function createTextReader(domEl) {
  var header = domEl.querySelector('h3');
  var content = domEl.querySelector('.details');
  var prevBtn = document.querySelector('.prev');
  var nextBtn = document.querySelector('.next');

  return {
    show: show,
    hide: hide
  };

  function show(tree) {
    document.body.classList.add('content-open');
    domEl.style.display = 'flex';
    var htmlContent = tree.html;
    if (tree.renderToC) {
      htmlContent += renderToC(tree);
    }
    content.innerHTML = htmlContent
    header.innerText = tree.name;
    content.parentElement.scrollTop = 0;

    var next = orderedChildren.getNext(tree)
    if (!next) next = tree;
    if (next) {
      nextBtn.style.display = 'block';
      nextBtn.innerText = 'Next';
      nextBtn.setAttribute('data-path', next.path);
    } else {
      nextBtn.style.display = 'none';
    }

    var prev = orderedChildren.getPrev(tree);
    if (prev) {
      prevBtn.style.display = 'block';
      prevBtn.innerText = 'Prev';
      prevBtn.setAttribute('data-path', prev.path);
    } else {
      prevBtn.style.display = 'none';
    }

  }
  function hide() {
    domEl.style.display = 'none';
    document.body.classList.remove('content-open');
  }
}

function renderToC(root) {
  var content = ['<ul>'];
  root.children.forEach(function(child) {
    content.push(
      '<li><a href="#" class="no-tooltip" data-path="' + child.path + '">' + child.name + '</a></li>'
    )
  })
  content.push('</ul>')
  return content.join('\n');
}

function handleMouseMove(e) {
  var path = e.target.getAttribute('data-path');
  if (!path || e.target.classList.contains('no-tooltip')) {
    tooltipManager.hide();
    return;
  }
  
  var treeElement = getTreeElementByPath(path);
  tooltipManager.showTooltip(treeElement, e);
}

function createTooltipManager(domEl) {
  var tooltipWidth = 300;
  var lastText;
  var height = 0;
  var hidden = true;

  return {
    showTooltip: showTooltip,
    hide: hide
  };

  function hide() {
    domEl.style.display = 'none';
    hidden = true;
  }

  function showTooltip(tree, e) {
    if (hidden) {
      domEl.style.display = 'block';
      hidden = false;
    }
    if (lastText !== tree.name) {
      domEl.innerText = tree.name;
      lastText = tree.name;
      height = domEl.getBoundingClientRect().height;
    }
    var x = e.clientX - tooltipWidth / 2;
    if (x + tooltipWidth > window.innerWidth) {
      x = window.innerWidth - tooltipWidth;
    }
    if (x < 0) x = 0;

    var y = e.clientY - height;
    if (y < 0) y = 0;

    domEl.style.left = x + 'px';
    domEl.style.top = y + 'px';
  }
}

function getTreeElementByPath(path) {
  var root = tree;

  path.split(':').forEach(function (idx) {
    root = root.children[idx];
  });

  return root;
}

function makeOrderedChildren(tree) {
  var lookup = new Map();
  var treeMemory = [];
  memorizeTree(tree);

  return {
    getNext: getNext,
    getPrev: getPrev
  };

  function getNext(treeElement) {
    return advance(treeElement, 1);
  }

  function getPrev(treeElement) {
    return advance(treeElement, -1)
  }

  function advance(treeElement, dx) {
    var idx = lookup.get(treeElement) + dx;
    if (!Number.isFinite(idx)) return;
    if (idx < 0 || idx >= treeMemory.length) return;
    return treeMemory[idx];
  }

  function memorizeTree(tree) {
    if (tree.startAngle !== 0) {
      treeMemory.push(tree);
      lookup.set(tree, treeMemory.length - 1);
    }
    if (tree.children) {
      tree.children.forEach(memorizeTree);
    }
  }
}

},{"./data.js":1,"./get-sunburst-path.js":2,"clap.js":4}],4:[function(require,module,exports){
module.exports = onClap;

function onClap(el, fn, config) {
  var touchStartTime;
  var startPos;
  config = config || {};
  if (typeof config.maxSingleTouchTime !== 'number') {
    config.maxSingleTouchTime = 300; // ms
  }
  if (typeof config.singleTapDistanceSquared !== 'number') {
    config.singleTapDistanceSquared = 25;
  }

  if (typeof fn !== 'function') throw new Error('callback is required') 

  el.addEventListener('click', invokeHandler)

  el.addEventListener('touchend', handleTouchEnd)
  el.addEventListener('touchstart', handleTouchStart)

  return disposePrevHandler;

  function handleTouchStart(e) {
    var touches = e.touches

    if (touches.length === 1) {
      touchStartTime = new Date()
      startPos = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY
      }
    }
  }

  function handleTouchEnd(e) {
    // multitouch - ignore
    if (e.touches.length > 1) return

    // single touch - use time diference to determine if it was a touch or
    // a swipe
    var dt = new Date() - touchStartTime

    // To long - ignore
    if (dt > config.maxSingleTouchTime) return

    var dx = e.pageX - startPos.x
    var dy = e.pageY - startPos.y

    if (dx * dx + dy * dy < config.singleTapDistanceSquared) {
      invokeHandler(e)
    }
  }

  function disposePrevHandler() {
    el.removeEventListener('click', invokeHandler)
    el.removeEventListener('touchend', handleTouchEnd)
    el.removeEventListener('touchstart', handleTouchStart)
  }

  function invokeHandler(e) {
    fn(e)
  }
}

},{}]},{},[3]);
