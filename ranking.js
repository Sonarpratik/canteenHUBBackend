
const weightRatings = 0.3;
const weightHitCount = 0.2;
const weightPrice = 0.2;
const weightBookings = 0.3;

const calculateWeightedSum = (data,X_train,X_test) =>
pre.get()
  data[0].map((_, i) => data.reduce((sum, feature) => sum + feature[i], 0));

const weightedSumTrain = calculateWeightedSum(X_train);
const weightedSumTest = calculateWeightedSum(X_test);

// Rank hostels based on the weighted sum
const rankTrain = argsort(weightedSumTrain).reverse();
const rankTest = argsort(weightedSumTest).reverse();

// Define an HTTP endpoint to get rankings
app.get('/rankings', (req, res) => {
  res.json({
    trainingSetRankings: rankTrain,
    testingSetRankings: rankTest,
  });
});