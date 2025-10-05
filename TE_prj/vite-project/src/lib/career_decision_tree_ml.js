
// Rollback: Remove entropy/info gain, keep only accuracy and basic tree structure
export async function getDecisionTreeMetrics() {
  const response = await fetch('/src/data/indian_education_careers.json');
  const dataset = await response.json();

  const streams = Array.from(new Set(dataset.map(d => d.stream)));
  const degrees = Array.from(new Set(dataset.map(d => d.degree)));
  const interests = Array.from(new Set(dataset.map(d => d.interest)));
  const careers = Array.from(new Set(dataset.map(d => d.career)));

  function encodeFeature(stream, degree, interest) {
    return [streams.indexOf(stream), degrees.indexOf(degree), interests.indexOf(interest)];
  }

  const X = dataset.map(item => encodeFeature(item.stream, item.degree, item.interest));
  const y = dataset.map(item => careers.indexOf(item.career));

  // Simple decision tree build (one-level split for demo)
  function bestSplit(X, y) {
    let bestFeature = null;
    let bestThreshold = null;
    let bestLeft = null;
    let bestRight = null;
    for (let f = 0; f < X[0].length; f++) {
      const values = Array.from(new Set(X.map(x => x[f])));
      for (let v of values) {
        const leftIdx = X.map(x => x[f] === v);
        const leftLabels = y.filter((_, i) => leftIdx[i]);
        const rightLabels = y.filter((_, i) => !leftIdx[i]);
        if ((leftLabels.length > 0) && (rightLabels.length > 0)) {
          bestFeature = f;
          bestThreshold = v;
          bestLeft = leftLabels;
          bestRight = rightLabels;
          break;
        }
      }
      if (bestFeature !== null) break;
    }
    return { bestFeature, bestThreshold, bestLeft, bestRight };
  }

  const split = bestSplit(X, y);

  // Build tree structure (one-level for demo)
  const treeStructure = {
    feature: split.bestFeature,
    threshold: split.bestThreshold,
    left: {
      samples: split.bestLeft.length,
      labels: split.bestLeft.map(l => careers[l])
    },
    right: {
      samples: split.bestRight.length,
      labels: split.bestRight.map(l => careers[l])
    }
  };

  // Simple accuracy calculation (majority class prediction for each split)
  function majority(labels) {
    const counts = {};
    labels.forEach(l => { counts[l] = (counts[l] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  }

  let correct = 0;
  for (let i = 0; i < X.length; i++) {
    const x = X[i];
    if (x[split.bestFeature] === split.bestThreshold) {
      if (y[i] === majority(split.bestLeft)) correct++;
    } else {
      if (y[i] === majority(split.bestRight)) correct++;
    }
  }
  const accuracy = correct / X.length;

  return {
    accuracy,
    treeStructure: JSON.stringify(treeStructure, null, 2),
    careers,
    streams,
    degrees,
    interests
  };
}