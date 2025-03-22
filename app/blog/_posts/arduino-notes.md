---
title: Arduino Notes
date: 2019-06-25 15:10:28
tags:
- C++
categories: Notes
---
## pinMode(pin, mode)
Mode type: 
- INPUT
- INPUT_PULLUP
- OUTPUT



## Interface
- Digital
![](https://i.imgur.com/YNzn3Kp.png)
- Analog
- Power pin

## Digital

### Wire Example
_source: [Lynda]((https://www.lynda.com/Arduino-tutorials/Digital-interfaces/783858/5015730-4.html?autoplay=true))_

![](https://i.imgur.com/GS6D9cx.png)

![](https://i.imgur.com/RIzXeBd.png)

### PushButton
Active Low Pushbutton -> send low signal to microprocessor / pull-up circuit, pull-up resistor
Active Down Pushbutton -> send up signal to microprocessor / pull-down circuit, pull-down resistor
![](https://i.imgur.com/SELPyod.png)

#### Build-in pull-up resist(input_pullup) & led light indicator(PIN #13)
![](https://i.imgur.com/g3uDWtT.png)

### Functions
- `digitalWrite()`
- `digitalRead(pin)`

### Code example
``` c++
int counter = 0;
int LED = 2;

void setup() {
    // initialize digital pin LED_BUILTIN as an output.
    // pinMode(LED_BUILTIN, OUTPUT);
    pinMode(LED, OUTPUT);
    Serial.begin(9600);
}
// the loop function runs over and over again forever
void loop() {
    digitalWrite(LED, HIGH);
    delay(1100);
    Serial.println("Open");
    digitalWrite(LED, LOW);
    delay(1100);
    Serial.println("Close");
    counter++;
    Serial.println(counter);
    // digitalWrite(LED_BUILTIN, HIGH); // turn the LED on (HIGH is the voltage level)
    // delay(1100); // wait for a second
    // digitalWrite(LED_BUILTIN, LOW); // turn the LED off by making the voltage LOW
    // delay(1100); // wait for a second
}

```

## Analog Input

### Sensors
Voltage, Analog Output, Ground
- Temperature sensor
- LDR sensor (voltage divider circuit)

E.g. TMP37, Scale Factor: `20 mV/C` = `Output voltage  - (0ffset voltage) mV / Temperature C`

### ADC
10-Bit Analog to Digial Converter, Voltage value: `0 mV -> 5000 mV`, ADC value: `0 -> 1023`

### Functions
- `analogReference()`, 5V -> `analogReference(DEFAULT)`
- `analogRead(A0)`, type `int`

## Analog Output
Pulse with Modulation(PWM), duty cycle, chnage pulse width(on status)

### Functions
- `analogReference()`, 5V -> `analogReference(DEFAULT)`
- `analogWrite(pin, value)`, value: amount of time digital pulse is set to high, `0 ~ 255 (0 ~ 5 V)`
- `map(fromValue, fromLow, fromHigh, toLow, toHigh)`, cast the range, `fromXXX` - the value of original, `toXXX`, the value of target.

### Example
``` c++
//arduino example - fading
int ledPin = 9;    // LED connected to digital pin 9

void setup() {
  // nothing happens in setup
}

void loop() {
  // fade in from min to max in increments of 5 points:
  for (int fadeValue = 0 ; fadeValue <= 255; fadeValue += 5) {
    // sets the value (range from 0 to 255):
    analogWrite(ledPin, fadeValue);
    // wait for 30 milliseconds to see the dimming effect
    delay(30);
  }

  // fade out from max to min in increments of 5 points:
  for (int fadeValue = 255 ; fadeValue >= 0; fadeValue -= 5) {
    // sets the value (range from 0 to 255):
    analogWrite(ledPin, fadeValue);
    // wait for 30 milliseconds to see the dimming effect
    delay(30);
  }
}
```

## Stepper Motor
Need Stepper Motor Drive Board and exteral AC supply
- Unipolar(eight-wire)
- Bipolar ()

``` c++
digitalWrite(motorpin1, HIGH);
digitalWrite(motorpin2, LOW);
digitalWrite(motorpin3, LOW);
digitalWrite(motorpin4, LOW);
delay(delayTime);

digitalWrite(motorpin1, LOW);
digitalWrite(motorpin2, HIGH);
digitalWrite(motorpin3, LOW);
digitalWrite(motorpin4, LOW);
delay(delayTime);

digitalWrite(motorpin1, LOW);
digitalWrite(motorpin2, LOW);
digitalWrite(motorpin3, HIGH);
digitalWrite(motorpin4, LOW);
delay(delayTime);

digitalWrite(motorpin1, LOW);
digitalWrite(motorpin2, LOW);
digitalWrite(motorpin3, LOW);
digitalWrite(motorpin4, HIGH);
delay(delayTime);
```

### Stepper Motor Library
`Stepper(steps, pin1, pin2, pin3, pin4)`

Steps per resolution (degrees/step), full = 360

# Reference 
- [Learning Arduino: Foundations](https://www.lynda.com/Arduino-tutorials/Digital-interfaces/783858/5015730-4.html?autoplay=true)
- [Learning Arduino: Interfacing with Analog Devices](www.lynda.com/Arduino-tutorials/Learning-Arduino-Interfacing-Analog-Devices/779749-2.html)