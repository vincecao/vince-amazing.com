---
title: Android Development Notes
date: 2019-02-03 22:42:17
tags:
- Java
- Android
categories: Notes
---

# Register in Android Manifest
- Activity: resposible for user interaction screens, creating windows, Views manage display and user interactivity
- Serivce: background tests
- Content Provider: provide managed access to data
- Broadcast Receiver: react to messages

# Setting adb to global

### Windows:
- contorl panel -> environment (edit system environment variables)
- Environment variables
- Edit **User/System**
- `PATH, (tools;platform-tools path)`
### Mac
- ~ sudo nano .bash_profile
- `export PATH=$PATH:~/Library/Android/sdk/tools:~/Library/Android/sdk/platform-tools`

# Permission Example

*AndroidManifest.xml*
`<uses-permission android:name="android.permission.INTERNET" />`

*MainActivity.java*
``` java
//onCreate{
    if(!permissionGranted){
        checkPermissions();
        return;
    }
//}

// Checks if external storage is available for read and write
    public boolean isExternalStorageWritable() {
        String state = Environment.getExternalStorageState();
        return Environment.MEDIA_MOUNTED.equals(state);
    }

    // Initiate request for permissions.
    private boolean checkPermissions() {
    
        if (!isExternalStorageWritable()) {
            Toast.makeText(this, "This app only works on devices with usable external storage",
                    Toast.LENGTH_SHORT).show();
            return false;
        }

        int permissionCheck = ContextCompat.checkSelfPermission(this,
                Manifest.permission.WRITE_EXTERNAL_STORAGE);
        if (permissionCheck != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this,
                    new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                    REQUEST_PERMISSION_WRITE);
            return false;
        } else {
            return true;
        }
    }

    // Handle permissions result
    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           @NonNull String permissions[],
                                           @NonNull int[] grantResults) {
        switch (requestCode) {
            case REQUEST_PERMISSION_WRITE:
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    permissionGranted = true;
                    Toast.makeText(this, "External storage permission granted",
                            Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(this, "You must grant permission!", Toast.LENGTH_SHORT).show();
                }
                break;
        }
    }
```

# Launcher Icon Assets
app -> new -> image assets

# Setting Activity
app -> new -> activity -> setting activity

``` java
//import Intent
public boolean onOptionsItemSelected(MenuItem item) {
    int id = item.getItemId();
    //noinspection SimplifiableIfStatement
    if (id == R.id.action_settings) {
        Intent intent = new Intent(this, SettingsActivity.class);
        startActivity(intent);
        return true;
    }
    return super.onOptionsItemSelected(item);
}
```

# Enable Jack compiler for Java 8 features

Modify in *build.gradle*

```
android {
    defaultConfig{
        jackOptions{
            enabled true
        }
    }
}

#after buildTypes:
compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
}
```

# [Communication usage scenarios](https://www.lynda.com/Android-tutorials/Android-Communicating-User/513591-2.html)
- Acknowledgement
- Confirmation
- Notification

## Toast Message
- Short, momentary test message
- not receive focus
- quick, informative to acknowledge
- display for amount of time

### Create a Toast message
``` java
Toast t = Toast.makeText(this, "This is a toast", toastDuration);
//t.setDuration(toastDuration)
```

### Position Toast on screen
``` java
t.setGravity(Gravity.CENTER, 0, 0);
//t.setGravity(Gravity.BOTTOM, 0, 0);
```

### Show the Toast message
``` java
t.show();
```

### CustomToast
``` java
LayoutInflater inflater = getLayoutInflater();
View layout = inflater.inflate(R.layout.custom_toast_layout, (ViewGroup)findViewById(R.id.customToastLayout));

TextView tv = (TestView)layout.findViewById( R.id.customToastLayout );
tv.setText("This is a toast");

Toast t = new Toast(getApplicationContext());
t.setDuration(toastDuration);
t.setView(layout);
t.show();
```

## Snackbar Messages
- Simliar to Toasts
- Quick messages to acknowledge some action
- can show different amout of time
- Appear at bottom of the screen
- Can specify a clickable action

### Create a Snackbar
``` java
Snackbar sb = Snackbar.make(findViewById(R.id.myCoordinatorLayout), "This is a snackbar", Snackbar.LENGTH_LONG);
```

### Set Snackbar action
``` java
sb.setAction("My Action", new View.OnClickListener(){
    @Override
    public void onClick(View view){
        Toast.makeText(getApplicationContext(), "Snackbar Action Tap!", Toast.LENGTH_SHORT).show();
    }
});
```

### Show the Snackbar
``` java
sb.show();
```

### Notice
- Need to add design appcompat in dependencies (**build.gradle** file)
- Layout use coordinatorLayout when need to swipe the snackbar feature

## Dialogs
- Stop current program flow
- Require the user to take action
- Maintain the user's current context

### simple dialog example
``` java
@Override
public Dialog onCreateDialog(Bundle savedInstanceState) {
    //Create an alertDialog.Builder instance
    AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
    //set builder properties
    builder.setTitle("Peas Preference");
    builder.setMessage("Do you like sugar snap peas?");
    
    builder.setPositiveButton("Sure!", new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
            Log.i(TAG, "Positive button clicked");
            mHost.onPositiveResult(SimpleDialogFragment.this);
        }
    });
    builder.setNegativeButton("No way!", new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
            Log.i(TAG, "Negative button clicked");
            mHost.onNegativeResult(SimpleDialogFragment.this);
        }
    });
    builder.setNeutralButton("Not Sure", new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
            Log.i(TAG, "Neutral button clicked");
            mHost.onNeutralResult(SimpleDialogFragment.this);
        }
    });
    //return the created dialog
    return builder.create();
}
```

#### Allow user to tap and cancel the dialog
``` java
//user cancel the dialog
@Override
public void onCancel(DialogInterface dlg) {
        super.onCancel(dlg);
        Log.i(TAG, "Dialog cancelled");
```

#### Not allow user to cancel
`setCancelable()` to make the dialog non-cancelable
``` java
simpleDialog.setCancelable(false);
```

### ShowDatePicker Dialog Example
``` java
// Get a calendar instance
Calendar cal = Calendar.getInstance();
// Create a DatePickerDialog
DatePickerDialog datePicker = new DatePickerDialog(this, new DatePickerDialog.OnDateSetListener() {
    @Override
    public void onDateSet(DatePicker view, int year, int monthOfYear, int dayOfMonth) {
        Log.i(TAG, String.format("Date Chosen -- day: %d, month: %d, year: %d", dayOfMonth, monthOfYear, year));
    }
}, cal.get(Calendar.YEAR), cal.get(Calendar.MONTH), cal.get(Calendar.DAY_OF_MONTH));
// Set the title and show the dialog
datePicker.setTitle("Choose a Date");
datePicker.show();
```

### SetItem to Dialog Example
``` java
private final String TAG = "AUC_COMPLEX";
private final String[] colors = {"Red", "Blue", "Green", "Yellow"};

@Override
public Dialog onCreateDialog(Bundle savedInstanceState) {
    AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
    // NOTE: setMessage doesn't work here because the list takes up the content
    // area. Use the setTitle method to set a descriptive prompt
    builder.setTitle("What Is Your Favorite Color?");
    // The setItems function is used to create a list of content
    builder.setItems(colors, new DialogInterface.OnClickListener() {
        @Override
        public void onClick(DialogInterface dialog, int which) {
            Log.i(TAG, String.format("Color chosen: %s", colors[which]));
        }
    });
    // Single-choice dialogs don't need buttons because they
    // auto-dismiss when the user makes a choice
    return builder.create();
};
```

### CustomDialog Example
``` java
public Dialog onCreateDialog(Bundle savedInstanceState) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        // Create the custom layout using the LayoutInflater class
        LayoutInflater inflater = getActivity().getLayoutInflater();
        View v = inflater.inflate(R.layout.custom_dialog_layout, null);
        // Build the dialog
        builder.setTitle("Please enter your name")
            .setPositiveButton("OK", new DialogInterface.OnClickListener() {
                @Override
                public void onClick(DialogInterface dialog, int which) {
                    Log.i(TAG, "OK Clicked");
                }
            })
            .setNegativeButton("Cancel", new DialogInterface.OnClickListener @Override public void onClick(DialogInterface dialog, int which) {
                    Log.i(TAG, "Cancel clicked");
                }
            })
    .setView(v);
return builder.create();
}
```

## Notification
[ref](https://developer.android.com/guide/topics/ui/notifiers/notifications)
- Display outside of the normal app
- Trigger parts when clicked
- Various forms
- Aciton individually
- appear on Lock screen

## New Activity
``` kotlin
class AboutMe : AppCompatActivity() { 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_about_me) //create a xml and add acitivity to mainifest
    }
}
```

``` kotlin
//other Activity class
bigButton.setOnClickListener {
    d("daniel","button was pressed")
    startActivity(Intent(this, AboutMe::class.java))
}
```

## getSharedPreferences
``` kotlin
val sharedPrefs = getSharedPreferences("production", Context.MODE_PRIVATE) //name
val isSignedIn = sharedPrefs.getBoolean("is_signed_in", false) // key, defValue

if(!isSignedIn){
} else {
}

//to edit
with(sharedPrefs.edit()){
    putBoolean("is_signed_in", true)
    commit()
}
```

## RecyclerView
- [Build an Android News Media App in Kotlin - Part 6](https://www.youtube.com/watch?v=CepB1OlOZ_4)
- [Android Integrate RecyclerView and CardView Dependency in Gradle. Android Kotlin Tutorial](https://www.youtube.com/watch?v=iepWnIHP7t8&t=211s)

### Type
- Linear Layout
- Grid Layout
- Staggered Grid Layout

### Data Class
``` kotlin
data class Story(
    val title: String,
    val text: String,
    val author: String
)
```
### Adapter
Hold data in to the list

### Link adapter to the recyclerView

## Data Model
Generate -> Constructor / Getter and Setter / toString()

## Parse a Json Using Volley
- [ref](https://www.youtube.com/watch?v=y2xtLqP8dSQ)
- [ref2](https://www.youtube.com/watch?v=bPDW9SdsGMo&list=PLrnPJCHvNZuBCiCxN8JPFI57Zhr5SusRL)

## UI
[ref](https://www.lynda.com/Android-tutorials/Load-XML-layout-file-runtime/518054/596676-4.html?srchtrk=index%3a12%0alinktypeid%3a2%0aq%3aAndroid+form+%0apage%3a1%0as%3arelevance%0asa%3atrue%0aproducttypeid%3a2)
### Rename in XML
`shift + f6`

### ViewGroup
- `FameLayout`
- `LinearLayout`
- `RelativeLayout`
- `GridView`
- `ListView`
- `CoordinatorLayout`
- `AppBarLayout`
- `DrawerLayout`
- `RecyclerView`, replace `GridView` / `ListView`

### DP and SP
[ref](https://www.lynda.com/Android-tutorials/Use-design-repository/518054/596680-4.html)

### String Display
``` xml
<TextView
    android:text="aaaaaaaaaaaaaaaaaaaaaaaaaaa"
    android:maxLines="1"
    android:ellipsize="end"
/>
```

#### String Movement
``` xml
<TextView
    android:id="@+id/textView"
    android:text="aaaaaaaaaaaaaaaaaaaaaaaaaaa"
    android:scrollbars="vertical"
/>
```

``` java
textView tv = (TextView) findViewById(R.id.textView);
tv.setMovementMethod(new ScrollingMovementMethod());
```

### TextInputLayout
``` xml
<android.support.design.widget.TextInputLayout
    android:id="@+id/textInputLayout"
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent">

    <EditText
        android:id="@+id/editName"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:ems="10"
        android:hint="Name"
        android:inputType="textPersonName" />

</android.support.design.widget.TextInputLayout>

<android.support.design.widget.TextInputLayout
    android:layout_width="0dp"
    android:layout_height="wrap_content"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toBottomOf="@+id/textInputLayout">

    <EditText
        android:id="@+id/editPassword"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:ems="10"
        android:hint="Password"
        android:inputType="textPassword" />

</android.support.design.widget.TextInputLayout>
```

### Toast
``` java

//Toast toast = new Toast(context);
// toast.setDuration(Toast.LENGTH_LONG);

// LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE); 
// View view = inflater.inflate(R.layout.your_custom_layout, null);
// toast.setView(view);
// toast.show();

//--------------------------------

// String text = "Hello toast!";
// int duration = Toast.LENGTH_SHORT;

// Toast toast = Toast.makeText(this, text, duration);
// toast.show();


public void onClick(View view) {
    String name = "Vince";
    String password = "Password";
    String message = String.format("name=%s, password=%s", name, password);
    Toast.makeText(this,message, Toast.LENGTH_SHORT).show();
}
```

### input Layout setError
``` java
TextInputLayout textInputLayoutName = findViewById(R.id.textInputLayoutName);
EditText editName2 = findViewById(R.id.editTextName);
String inputName = textInputLayoutName.getEditText().getText().toString().trim();
//        String inputName2 = editName2.getText().toString().trim();
if(inputName.isEmpty()){
    textInputLayoutName.setError("Name is empty");
    editName2.setError("Name is empty");
    Toast.makeText(this,"Name is empty", Toast.LENGTH_SHORT).show();
}else{
    Toast.makeText(this,inputName, Toast.LENGTH_SHORT).show();
}
```

### Spinner
``` xml
<Spinner
    android:id="@+id/spinner"/>
```

``` xml
<resources>
    <string-array name="spinner">
        <item>1</item>
        <item>2</item>
        <item>3</item>
    </string-array>
</resources>
```

``` java
Spinner spin = findViewById(R.id.spinner);
ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.spinner, android.R.layout.simple_spinner_item);
adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
spin.setAdapter(adapter);
spin.setOnItemSelectedListener(this);
```

### [Add Tabs to the Action Bar](https://developer.android.com/training/implementing-navigation/lateral#java)
``` java
@Override
public void onCreate(Bundle savedInstanceState) {
    final ActionBar actionBar = getActionBar();
    ...

    // Specify that tabs should be displayed in the action bar.
    actionBar.setNavigationMode(ActionBar.NAVIGATION_MODE_TABS);

    // Create a tab listener that is called when the user changes tabs.
    ActionBar.TabListener tabListener = new ActionBar.TabListener() {
        public void onTabSelected(ActionBar.Tab tab, FragmentTransaction ft) {
            // show the given tab
        }

        public void onTabUnselected(ActionBar.Tab tab, FragmentTransaction ft) {
            // hide the given tab
        }

        public void onTabReselected(ActionBar.Tab tab, FragmentTransaction ft) {
            // probably ignore this event
        }
    };

    // Add 3 tabs, specifying the tab's text and TabListener
    for (int i = 0; i < 3; i++) {
        actionBar.addTab(
                actionBar.newTab()
                        .setText("Tab " + (i + 1))
                        .setTabListener(tabListener));
    }
}
```

``` java
viewPager = findViewById(R.id.main_viewPager);
tabLayout = findViewById(R.id.tabLayout);
tabLayout.setupWithViewPager(viewPager); //link together

//adapter
fragAdapter = new fragAdapter(getSupportFragmentManager());
viewPager.setAdapter(fragAdapter);
```
- [ref](https://codinginflow.com/tutorials/android/tab-layout-with-fragments)
- [ref2](https://www.youtube.com/watch?v=7aLCWbe6Awk)
- [ref3](https://www.youtube.com/watch?v=Vxiy_h5hNII)
- [TabLayout tabs text not displaying](https://stackoverflow.com/questions/38049076/tablayout-tabs-text-not-displaying)

``` java
private String[] tabTitles = new String[]{"Tab1", "Tab2", "Tab3"};
@Override
public CharSequence getPageTitle(int position) {
    return tabTitles[position];
}

```

#### Tab select listener
``` java
tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
    @Override
    public void onTabSelected(TabLayout.Tab tab) {
    }

    @Override
    public void onTabUnselected(TabLayout.Tab tab) {
    }

    @Override
    public void onTabReselected(TabLayout.Tab tab) {

    }
});
```

#### Tab Add Icon
- [how to add the icon for swipeable tabs] (https://stackoverflow.com/questions/21528687/how-to-add-the-icon-for-swipeable-tabs)
``` java
//An array containing your icons from the drawable directory
 final int[] ICONS = new int[]{
            R.drawable.icon_1,
            R.drawable.icon_2,
            R.drawable.icon_3
    };

    //Get reference to your Tablayout
    TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);
    tabLayout.setupWithViewPager(mViewPager);

    tabLayout.getTabAt(0).setIcon(ICONS[0]);
    tabLayout.getTabAt(1).setIcon(ICONS[1]);
    tabLayout.getTabAt(2).setIcon(ICONS[2]);
```


### SoftKeywordCover EditText
[Android soft keyboard covers edittext field](https://stackoverflow.com/questions/3295672/android-soft-keyboard-covers-edittext-field)

_manifest.xml_
``` xml
<activity
    android:name=".Activities.InputsActivity"
    ...
    android:windowSoftInputMode="adjustPan"
/>
```
### Splash Screen
[The (Complete) Android Splash Screen Guide](https://android.jlelse.eu/the-complete-android-splash-screen-guide-c7db82bce565)

### AutoCompleteTextView
[AutoCompleteTextView - Android Studio Tutorial](https://www.youtube.com/watch?v=JB3ETK5mh3c)
``` xml
<AutoCompleteTextView
    ...
    android:completionThreshold="1"
/>
```

``` java
private static final String[] ZIPCODES = new String[]{
        "90001", "90002", "91001", "91003", "92000"
};

protected void onCreate(Bundle savedInstanceState){
    AutoCompleteTextView textView = (AutoCompleteTextView) getView().findViewById(R.id.textView);
    ArrayAdapter<String> adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, ZIPCODES);
    textView.setAdapter(adapter);
}
```
### AddListener
#### `setOnCheckedChangeListener`
``` java
CheckBox cb = (CheckBox) view.findViewById(R.id.cb);
cb.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
    @Override
    public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
        if (isChecked) {
        } else {
        }

    }
});
```

#### `addTextChangedListener`
[android on Text Change Listener](https://stackoverflow.com/questions/20824634/android-on-text-change-listener)
``` java
EditText editText = (AutoCompleteTextView) view.findViewById(R.id.editText);
editText.addTextChangedListener(new TextWatcher() {
    @Override
    public void afterTextChanged(Editable s) {
    }

    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {
    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {
        if (s.length() != 0){           
        }
    }
});
```

#### `setOnClickListener`
``` java
ToggleButton toggleButton = (ToggleButton) findViewById(R.id.toggle1);
toggleButton.setOnClickListener(new View.OnClickListener() {
    public void onClick(View v) {
    if (((ToggleButton) v).isChecked())
        DisplayToast("Toggle button is On");
    else
        DisplayToast("Toggle button is Off");
    }
});
```

### Start A new Activity
Send
``` java
Intent myIntent = new Intent(getBaseContext(), Result.class);
myIntent.putExtra("key", "Value"); //Optional parameters
this.startActivity(myIntent);
```

Receive
``` java
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.newActivity);
    Toolbar toolbar = findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);

    Intent intent = getIntent();
    String value = intent.getStringExtra("key"); //if it's a string you stored.
    d("value",value);
}
```

### Up back button
- [How to Add an Up Button to the AppBar - Android Studio Tutorial](https://www.youtube.com/watch?v=JkVdP-e9BCo)
- [Add an up action](https://developer.android.com/training/appbar/up-action.html)
- [Display back button on action bar](https://stackoverflow.com/questions/15686555/display-back-button-on-action-bar)
_Will get a new Activity_
``` xml
android:parentActivityName=".MainActivity"
```

``` java
getSupportActionBar().setDisplayHomeAsUpEnabled(true);
```

_Will perform as back_
```java
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.newActivity);
    getSupportActionBar().setDisplayHomeAsUpEnabled(true);
}

@Override
public boolean onSupportNavigateUp(){  
    finish();  
    return true;  
}
```

### Volley / Picasso
- [RecyclerView + Volley + Picasso Tutorial - Android Programming](https://www.youtube.com/playlist?list=PLrnPJCHvNZuBCiCxN8JPFI57Zhr5SusRL)
- [Android 8: Cleartext HTTP traffic not permitted](https://stackoverflow.com/questions/45940861/android-8-cleartext-http-traffic-not-permitted)
- [Networking with the Volley Library](https://github.com/codepath/android_guides/wiki/Networking-with-the-Volley-Library)
- [NullPointerException addToRequestQueue(com.android.volley.Request, java.lang.String)' on a null object reference](https://stackoverflow.com/questions/31302011/nullpointerexception-addtorequestqueuecom-android-volley-request-java-lang-str)
- [RecyclerView + CardView - Part 5 - CLICKING SPECIFIC ITEMS - Android Studio Tutorial](https://www.youtube.com/watch?v=HMjI7cLsyfw)

``` java
VolleyLog.DEBUG = true;

JsonObjectRequest req = new JsonObjectRequest(Request.Method.GET, "http://ip.jsontest.com/", null,
        new Response.Listener<JSONObject>()
        {
            @Override
            public void onResponse(JSONObject response) {
                // display response
                try {
                    d("Response", response.getString("ip"));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        },
        new Response.ErrorListener()
        {
            @Override
            public void onErrorResponse(VolleyError error) {
                d("Error.Response", error.toString());
            }
        }
);
```

### Visiblity
- `xxx.setVisibility(View.GONE);` none
- `xxx.setVisibility(View.VISIBLE);` show
- `xxx.setVisibility(View.INVISIBLE);` Hide

### Prograss Bar
[Android ProgressBar Example](https://www.journaldev.com/9629/android-progressbar-example)
``` xml
<ProgressBar
    android:id="@+id/progressBar"
    style="?android:attr/progressBarStyleHorizontal"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_alignParentLeft="true"
    android:layout_alignParentTop="true"
    android:layout_marginLeft="23dp"
    android:layout_marginTop="20dp"
    android:indeterminate="false"
    android:max="100"
    android:minHeight="50dp"
    android:minWidth="200dp"
    android:progress="1" />
    
<ProgressBar
    android:id="@+id/progressBar_cyclic"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:minHeight="50dp"
    android:minWidth="50dp"
    android:layout_centerVertical="true"
    android:layout_centerHorizontal="true" />
```

### Toggle Button Customized with Image
[Android: Create a toggle button with image and no text](https://stackoverflow.com/questions/18598255/android-create-a-toggle-button-with-image-and-no-text)

### Preference
[how to use getSharedPreferences in android](https://stackoverflow.com/questions/5950043/how-to-use-getsharedpreferences-in-android)
``` java
SharedPreferences userDetails = context.getSharedPreferences("userdetails", MODE_PRIVATE);

Editor edit = userDetails.edit();
edit.putString("username", username.getText().toString().trim());
edit.putString("password", password.getText().toString().trim());
edit.apply();

String userName = userDetails.getString("username", "");
String password = userDetails.getString("password", "");
//getBoolean, long, float
```

[GSON - How Android SharedPreferences save/store object](https://stackoverflow.com/questions/7145606/how-android-sharedpreferences-save-store-object)

### Set image background and tint its color
``` xml
android:src="@drawable/image"
android:backgroundTint="#B7B2B0"
```
OR
``` java
ImageView iv = findViewById(R.id.iv);
iv.setBackgroundResource(R.drawable.image);
iv.getBackground().setColorFilter(Color.parseColor("#B7B2B0"), PorterDuff.Mode.MULTIPLY);
```