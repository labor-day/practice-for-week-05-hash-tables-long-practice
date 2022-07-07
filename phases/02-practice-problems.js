function anagrams(str1, str2) {
  // Your code here
  let str1Letters = {};
  let str2Letters = {};

  str1 = str1.split("");
  str2 = str2.split("");

  str1.forEach(
    letter => {
      if (str1Letters[letter]) {
        str1Letters[letter]++;
      } else {
        str1Letters[letter] = 1;
      }
    }
  );

  str2.forEach(
    letter => {
      if (str2Letters[letter]) {
        str2Letters[letter]++;
      } else {
        str2Letters[letter] = 1;
      }
    }
  );

  for (letter in str1Letters) {
    if (str2Letters[letter] !== str1Letters[letter]) {
      return false;
    }
  }

  for (letter in str2Letters) {
    if (str2Letters[letter] !== str1Letters[letter]) {
      return false;
    }
  }

  return true;
}

function commonElements(arr1, arr2) {
  // Your code here
  let first = {}
  let second = {};
  let common = [];
  arr1.forEach(
    number => {
      if (first[number]) {first[number]++;}
      else {first[number] = 1;}
    }
  );
  arr2.forEach(
    number => {
      if (second[number]) {second[number]++;}
      else {second[number] = 1;}
    }
  );
  for (number in first) {
    if (second[number]) {
      common.push(Number(number));
    }
  }

  return common;
}


function duplicate(arr) {
  // Your code here
  let count = {};
  let dupe;
  arr.forEach(
    number => {
      if (count[number]) {
        dupe = count[number]["value"];
      } else {
        let info = {
          value: number,
          count: 1
        };
        count[number] = info;
      }
    }
  );
  return dupe;
}


function twoSum(nums, target) {
  // Your code here
  // for (let i = 0; i < nums.length - 1; i++) {
  //   for (let j = i + 1; j < nums.length; j++) {
  //     if (nums[i] + nums[j] === target) {
  //       return true;
  //     }
  //   }
  // }
  // return false;

  let askingFor = {};
  for (let i = 0; i < nums.length; i++) {
    if (askingFor[nums[i].toString()]) {return true;} else {
      let iNeed = target - nums[i];
      askingFor[iNeed] = nums[i];
    }

  }
  return false;
}

function wordPattern(pattern, strings) {
  // Your code here
  let pairs = {};

  pattern = pattern.split("");

  for (let i = 0; i < pattern.length; i++) {
    let letter = pattern[i];
    let word = strings[i];

    if (pairs[letter]) {
      if (word !== pairs[letter]) {
        console.log(false);
        return false;
      }
    }

    if (pairs[letter] === undefined && Object.values(pairs).includes(word)) {
      console.log(false);
      return false;
    }

    if (pairs[letter] === undefined && !Object.values(pairs).includes(word)) {
      pairs[letter] = word;
    }

  }

  console.log(true);
  return true;
}

//wordPattern("ABCDABCD", ["Apple", "Berry", "Cantaloupe", "Date", "Apple", "Berry", "Cantaloupe", "Elderberry"]);
wordPattern("ABBA", ['dog', 'cat', 'cat', 'dog'])
wordPattern("ABBA", ['dog', 'dog', 'dog', 'dog'])
wordPattern("AAAA", ['dog', 'dog', 'dog', 'dog'])
wordPattern("ABCD", ['dog', 'cat', 'dog', 'cat'])


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
