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

function kth(string, position) {

let counts = {};

for (let i = 0; i < string.length; i++) {
  let letter = string[i];
  if (counts[letter]) {
    counts[letter]++;
  } else {
    counts[letter] = 1;
  }
}

let letters = Object.keys(counts);

letters.sort(
  (a, b) => {
    return counts[b] - counts[a]
  }
);

return letters[position-1];
}

// kth('aaabbc', 1); // a
// kth('aaabbc', 2); //b
// kth('aaabbc', 3); //c

function newAlphabet(string, alphabet) {

  let letters = alphabet.split("");
  let positions = {};
  letters.forEach(
    (letter, index) => {
      positions[letter] = index;
    }
  );

  let lastPosition = -1;
  for (let i = 0; i < string.length; i++) {
      let letter = string[i];
      let position = positions[letter];
      if (position >= lastPosition) {
        lastPosition = position;
      } else {
        return false;
      }
  }
  return true;
}

// newAlphabet('dino', 'abcdefghijklmnopqrstuvwxyz');           // => true
// newAlphabet('leetcode', 'abcdefghijklmnopqrstuvwxyz');       // => false
// newAlphabet('leetcod', 'labefghijkmnpqrstucvowxdyz');        // => true

function longestPalindrome(string) {
  let letters = string.split("");
  let counts = {};

  letters.forEach(
    letter => {
      if (counts[letter]) {
        counts[letter]++;
      } else {
        counts[letter] = 1;
      }
    }
  );

  let once = [];
  let odd = [];
  let even = [];

  //iterate over the object
  for (let letter in counts) {
  //get all letters that occur once
  if (counts[letter] === 1) {
    once.push(letter);
  }
   //pick one, it doesnt matter which
   //insert into the word array

  //get all letter that occur an odd number of times && more than twice
  else if (counts[letter] % 2 === 0) {
    even.push(letter);
  }
  //push and unshift repeatedly [(# of occurrences minus 1) / 2]

  //get all letters that occur an even number of times
  else if (counts[letter] % 2 === 1) {
    odd.push(letter);
  }
  //push and unshift repeatedly [(# of occurrences) / 2]
  }

  let word = [];
  if (once[0]) {
    word.push(once[0]);
  }
  even.forEach(
    letter => {
      for (let i = 0; i < counts[letter]/2; i++) {
        word.unshift(letter);
        word.push(letter);
      }
    }
  );

  odd.forEach(
    letter => {
      for (let i = 0; i < (counts[letter]-1)/2; i++) {
        word.unshift(letter);
        word.push(letter);
      }
    }
  );

  return word.length;

}

//console.log(longestPalindrome("abccccdd")); 

function longestSubstr(string) {
  let uniqueLetters = new Set(string);
  return uniqueLetters.size;
}

//console.log(longestSubstr("abcabcbb"));      // => 3, where the longest substring is "abc"
//console.log(longestSubstr("bbbbb"));         // => 1, where the longest substring is "b"

function maxSubarr(numbers) {

  let counts = {};

  numbers.forEach(
    number => {
      if (counts[number]) {
        counts[number]++;
      } else {
        counts[number] = 1;
      }
    }
  );

  let longestSubArr = 0;
  for (let number in counts) {
      let minusOne = Number(number)-1;
      let plusOne = Number(number)+1;
      let minusOneLength = 0;
      let plusOneLength = 0;

      if (counts[minusOne]) {
        minusOneLength = counts[number] + counts[minusOne];
      } else {
        minusOneLength = counts[number];
      }

      if (counts[plusOne]) {
        plusOneLength = counts[number] + counts[plusOne];
      } else {
        plusOneLength = counts[number];
      }

      let longer = Math.max(minusOneLength, plusOneLength);
      if (longer > longestSubArr) {longestSubArr = longer;}
  }

  //console.log(longestSubArr);
  return longestSubArr;
}

maxSubarr([1,3,2,2,5,2,3,7]);  // => 5 because the longest subarray is [3,2,2,2,3]
maxSubarr([1,1,1,1,3]);     // => 4 because the longest subarray is [1,1,1,1]

function coinChange(coins, amount) {

  if (amount === 0) {return amount;}

  coins.sort(
    (a, b) => b - a
  );

  let selected = [];

  for (let i = 0; i < coins.length; i++) {
    let coin = coins[i];

    while (amount >= coin) {
      selected.push(coin);
      amount -= coin;
    }
  }

  if (selected.length === 0) {return -1;}
  return selected.length;


}

const coins = [1, 5, 10, 25];
const coins2 = [5];

// console.log(coinChange(coins, 11),     // => 2, 10 + 1 = 11
// coinChange(coins2, 3),    // => -1
// coinChange(coins2, 0));    // => 0

function climbingSteps(amount) {
  let steps = [1, 1, 2];

  for (let i = 3; i <= amount; i++) {
    steps[i] = steps[i-1] + steps[i-2] + steps[i-3];
  }

  console.log(steps[amount]);
  return steps[amount];

}

// There is 1 way to climb zero steps:
//   1. 0 steps
climbingSteps(0);  // 1

// There is 1 ways to climb one step:
//   1. 1 step
climbingSteps(1);  // 1

// There are 2 ways to climb two steps:
//   1. 1 step + 1 step
//   2. 2 steps

climbingSteps(2);  // 2

// There are 4 ways to climb three steps:
//   1. 1 step + 1 step + 1 step
//   2. 1 step + 2 steps
//   3. 2 steps + 1 step
//   4. 3 steps
climbingSteps(3);  // 4

// There are 7 ways to climb four steps:
//   1. 1 step + 1 step + 1 step + 1 step
//   2. 1 step + 1 step + 2 steps
//   3. 1 step + 2 steps + 1 step
//   4. 2 steps + 1 step + 1 step
//   5. 2 steps + 2 steps
//   6. 1 step + 3 steps
//   7. 3 steps + 1 steps
climbingSteps(4);  // 7


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
