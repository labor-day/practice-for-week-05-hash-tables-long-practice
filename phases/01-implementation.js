class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    // Your code here
    this.capacity = numBuckets;
    this.data = new Array(this.capacity);
    this.data.fill(null);
    this.count = 0;
    this.loadFactor = 0.7;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    // Your code here
    let newPair = new KeyValuePair(key, value);
    let index = this.hashMod(key);
    let existing = this.data[index];

    if (existing) {
      let current = existing;
      let replaced = false;

      while (current) {
        if (current.key === newPair.key) {
          current.value = newPair.value;
          replaced = true;
        }
        current = current.next;
      }

      if (!replaced) {
        newPair.next = existing;
        this.data[index] = newPair;
        this.count++;
      }
    } else {
      this.data[index] = newPair;
      this.count++;
    }

    if (this.count/this.capacity >= this.loadFactor) {
      this.resize();
    }


  }


  read(key) {
    // Your code here
    let index = this.hashMod(key);
    let current = this.data[index];
    while (current) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return undefined;
  }


  resize() {
    // Your code here
    let old = this.data;

    this.capacity = this.capacity * 2;
    this.data = new Array(this.capacity);
    this.data.fill(null);
    this.count = 0;

    old.forEach(
      pair => {
        let current = pair;
        while (current) {
          this.insert(current.key, current.value);
          current = current.next;
        }
      }
    );

  }


  delete(key) {
    // Your code here
    let index = this.hashMod(key);
    let current = this.data[index];

    while (current) {
      if (current.key === key) {
        //console.log("current", current);
        let newHead = current.next || null;
        this.count--;
        //console.log("new head", newHead);
        this.data[index] = newHead;
      } else if (current.next && current.next.key === key) {
        current.next = current.next.next || null;
        this.count--;
      }
      current = current.next;
    }
    return "Key not found";

  }
}

// hashTable = new HashTable(2);
// hashTable.insert("key1", "value1");
// hashTable.insert("key2", "value2");
// hashTable.insert("key3", "value3");
// hashTable.insert("key5", "value5");
// hashTable.insert("key9", "value9");
// hashTable.insert("key10", "value10");

// hashTable.delete("key2");
// hashTable.delete("key9");
// hashTable.delete("key10");

// console.log(hashTable.data);


module.exports = HashTable;
