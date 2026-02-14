class Pet {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this._health = 50;
    this.energy = 50;
  }

  // Getter
  get health() {
    return this._health;
  }

  // Setter (keeps health between 0 and 100)
  set health(value) {
    if (value > 100) {
      this._health = 100;
    } else if (value < 0) {
      this._health = 0;
    } else {
      this._health = value;
    }
  }

  feed() {
    this.health += 10;
    this.energy += 5;
  }

  play() {
    this.health -= 5;
    this.energy -= 10;
  }

  getStatus() {
    return `
      Name: ${this.name} 🐾 <br>
      Type: ${this.type} <br>
      Health: ${this.health} ❤️ <br>
      Energy: ${this.energy} ⚡
    `;
  }
}

// Create Pet Object
const myPet = new Pet("Buddy", "Dog");

function updateStatus() {
  document.getElementById("petStatus").innerHTML = myPet.getStatus();
}

function feedPet() {
  myPet.feed();
  updateStatus();
}

function playWithPet() {
  myPet.play();
  updateStatus();
}

// Initial Status
updateStatus();
