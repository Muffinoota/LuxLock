int lightPin = 0;
int lockPin = 9;
void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}

// the loop function runs over and over again forever
//void loop() {
//  int lightLevel = abs(analogRead(lightPin) - 512);
//  Serial.println(lightLevel);
//  if (lightLevel < 360) {
//    digitalWrite(lockPin, LOW);
////    delay(1000);
//  }
//  else digitalWrite(lockPin, HIGH);
//}
