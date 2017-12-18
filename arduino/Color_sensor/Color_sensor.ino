/*     Arduino Color Sensing Tutorial
 *
 *  by Dejan Nedelkovski, www.HowToMechatronics.com
 *
 */

#define S0 4
#define S1 5
#define S2 6
#define S3 7
#define sensorOut 8
#define capDelay 32
#define relayPin 2

int seconds = 0;
int bFreq = 0;
int gFreq = 0;
int rFreq = 0;
int bFreqOffset = 0;
int gFreqOffset = 0;
int rFreqOffset = 0;

bool code[] = {false, false, false, false};
int rTimer = 0;
int gTimer = 0;
int bTimer = 0;

bool callibrated = false;

bool addTime() {
  if (millis() % 4) {
    seconds++;
    return seconds;
  }
}

void ledOn() {
  digitalWrite(13, HIGH);
  digitalWrite(relayPin, LOW);
}

void ledOff() {
  digitalWrite(13, LOW);
  digitalWrite(relayPin, HIGH);
}


void setup() {
  pinMode(S0, OUTPUT);
  pinMode(S1, OUTPUT);
  pinMode(S2, OUTPUT);
  pinMode(S3, OUTPUT);
  pinMode(relayPin, OUTPUT);
  pinMode(sensorOut, INPUT);

  pinMode(13, OUTPUT);

  // Setting frequency-scaling to 20%
  digitalWrite(S0,HIGH);
  digitalWrite(S1,LOW);

  Serial.begin(9600);
}

void loop() {
  // Setting Blue filtered photodiodes to be read
  digitalWrite(S2,LOW);
  digitalWrite(S3,HIGH);
  // Reading the output frequency
  bFreq = (pulseIn(sensorOut, LOW) - 1023);
  bFreq = abs(bFreq);
  //Remaping the value of the frequency to the RGB Model of 0 to 255
  // bFreq = map(bFreq, 25,70,255,0);
  bFreq += bFreqOffset;
  // Printing the value on the serial monitor
  Serial.print("B= ");//printing name
  Serial.print(bFreq);//printing RED color frequency
  Serial.print("  ");
  delay(capDelay);

  // Setting red filtered photodiodes to be read
  digitalWrite(S2,LOW);
  digitalWrite(S3,LOW);
  // Reading the output frequency
  rFreq = (pulseIn(sensorOut, LOW) - 1023);
  rFreq = abs(rFreq);
  //Remaping the value of the frequency to the RGB Model of 0 to 255
  // rFreq = map(rFreq, 25,72,255,0);
  rFreq += rFreqOffset;
  // Printing the value on the serial monitor
  Serial.print("R= ");//printing name
  Serial.print(rFreq);//printing RED color frequency
//   if (rFreq > 200) {
//     Serial.print("Red is high: ");
// //    digitalWrite(13, HIGH);
// //    delay(1000);
//   }
  Serial.print("  ");
  delay(capDelay);

  // Setting Green filtered photodiodes to be read
  digitalWrite(S2,HIGH);
  digitalWrite(S3,HIGH);
  // Reading the output frequency
  gFreq = (pulseIn(sensorOut, LOW) - 1023);
  gFreq = abs(gFreq);
  //Remaping the value of the frequency to the RGB Model of 0 to 255
  // gFreq = map(gFreq, 30,90,255,0);
  gFreq += gFreqOffset;
  // Printing the value on the serial monitor
  Serial.print("G= ");//printing name
  Serial.print(gFreq);//printing RED color frequency
  Serial.println("  ");
  delay(capDelay);

  int average  = (rFreq + gFreq + bFreq) / 3;

  if (!callibrated && millis() > 500) {
    gFreqOffset = -(gFreq - average);
    rFreqOffset = -(rFreq - average);
    bFreqOffset = -(bFreq - average);
    callibrated = true;
  }

  float diffScale = 10;

  int timerMax = 170;
  int timerBoost = 60;

  if (rFreq > gFreq && rFreq > bFreq && rFreq - average > diffScale) {
    Serial.print("It's red");
    rTimer += timerBoost;
    if (rTimer > timerMax) {
      if (!code[0]) {
        code[0] = true;
        rTimer = 0;
      } else {
        code[2] = true;
      }
    }
  }
  else if (gFreq > rFreq && gFreq > bFreq && gFreq - average > diffScale) {
    Serial.print("It's green");
    gTimer += timerBoost;
    if (gTimer > timerMax) {
      if (code[0]) {
        code[1] = true;
      }
    }
  }
  else if (bFreq > gFreq && bFreq > rFreq && bFreq - average > diffScale) {
    Serial.print("It's blue");
    bTimer += timerBoost;
    if (bTimer > timerMax) {
      if (code[2]) {
        code[3] = true;
      }
    }
  } else {
    if (addTime() > 30) {
      for (int i = 0; i < 4; i ++) code[i] = false;
      seconds = 0;
    }
    ledOff();
    rTimer = 0;
    gTimer = 0;
    bTimer = 0;
  }
  if (code[0] && code[1] && code[2] && code[3]) {
    seconds = 0;
    ledOn();
    delay(5000);
    ledOff();
    for (int i = 0; i < 4; i ++) code[i] = false;
  }

}
