---
title: C# Syntax Notes
date: 2019-05-17 09:42:17
tags:
- Csharp
categories: Notes
---
__[Java vs. C#](https://www.javacamp.org/javavscsharp/)__

# Array
ref: _[Arrays](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/)_

``` csharp
// Declare a single-dimensional array 
int[] array1 = new int[5];

// Declare and set array element values
int[] array2 = new int[] { 1, 3, 5, 7, 9 };

// Alternative syntax
int[] array3 = { 1, 2, 3, 4, 5, 6 };
```

## Multi-Array
``` csharp
// Declare a two dimensional array
int[,] multiDimensionalArray1 = new int[2, 3];

// Declare and set array element values
int[,] multiDimensionalArray2 = { { 1, 2, 3 }, { 4, 5, 6 } };
```

## Jagged Array
``` csharp
// Declare a jagged array
int[][] jaggedArray = new int[6][];

// Set the values of the first array in the jagged array structure
jaggedArray[0] = new int[4] { 1, 2, 3, 4 };
```

# ArrayList & List
ref: _[List](https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=netframework-4.8)_, _[ArrayList](https://docs.microsoft.com/en-us/dotnet/api/system.collections.arraylist?view=netframework-4.8)_, _[ref1](https://www.tutorialsteacher.com/csharp/csharp-list)_, _[ref2](https://stackoverflow.com/questions/2309694/arraylist-vs-list-in-c-sharp)_

1. `ArrayList` is` List<Object>`, __do not use__ `ArrayList` in new code that targets `.NET >= 2.0`, __use__ `List<T>`
2. The `List<T>` is a concreate implementation of `IList<T>` interface.

- Capacity
- Count
- Add(Object), AddRange(ICollection)
- BinarySearch(Object), BinarySearch(Int32, Int32, Object, IComparer), _Search the element and returns an index of the element_. 
- Contains(Object)
- Foreach(), _Iterates through a List<T>._
- Insert(Int32, Object)
- Remove(Object), RemoveAt(Int32)
- Reverse(), Reverse(Int32, Int32)//specified range.
- Sort()
- ToArray()
- ToString()

``` csharp
ArrayList myAL = new ArrayList();
myAL.Add("Hello");
myAL.Add("World");
myAL.Add("!");

public static void PrintValues( IEnumerable myList )  {
    foreach ( Object obj in myList )
        Console.Write( "   {0}", obj );
    Console.WriteLine();
}

//List

List<int> list1 = new List<int>();
//Or
IList<int> list1 = new List<int>();

list1.Add(1);
//list1.Add("Pony"); //<-- Error at compile process
int total = 0;
foreach (int num in list1 )
{
 total += num;
}
```
# enum
_[ref](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/enum)_

``` csharp
public enum CropType
{
    NORMAL, POINT, CENTER
}

public Bitmap Crop(CropType crop, int a, int b, int c, int d)
{
    switch (crop)
    {
        case CropType.NORMAL:
            {
                    return CropAt(a, b, c, d);
                    break;
            }
        case CropType.POINT:
            {
                return CropAtPoint(a, b, c, d);
                break;
            }
        case CropType.CENTER:
            {
                return CropAtCenter(a, b, c, d);
                break;
            }
        default:
            return null;
    }
}

//other class
Bitmap b1 = vC.Crop(vCropImage.CropType.POINT, 40, 40, 700, 200);

//example with value
enum WeekDays
{
    Monday = 0,
    Tuesday =1,
    Wednesday = 2,
    Thursday = 3,
    Friday = 4,
    Saturday =5,
    Sunday //will automatically assign incremental values e.g.6
}

Console.WriteLine(WeekDays.Friday);
Console.WriteLine((int)WeekDays.Friday);
```

# SortedDictionary
``` csharp
SortedDictionary<string, float> dataDict = new SortedDictionary<string, float>();

dataDict.Add("TopTheta", 1.5501F);
dataDict.Add("BottomTheta", -1.59191F);
//...
```

# Serial Communication
``` csharp
private void initPort()
{
    serialPort.PortName = "COM4";
    serialPort.DataBits = 8;
    serialPort.Parity = Parity.None;
    serialPort.StopBits = StopBits.One;
    serialPort.BaudRate = 57600;

    //private SerialPort port = new SerialPort("COM1", 9600, Parity.None, 8, StopBits.One);

    //serialPort.DiscardOutBuffer();
    //serialPort.DiscardInBuffer();

    serialPort.DataReceived += new SerialDataReceivedEventHandler(port_DataReceived);

    try{
        serialPort.Open();
    }catch{
        //MessageBox.Show(d.ToString());
    }

    var data = "...";
    if (serialPort.IsOpen)
        serialPort.Write(data);
}

private void port_DataReceived(object sender, SerialDataReceivedEventArgs e)
{
    Console.WriteLine(serialPort.ReadExisting());
}
```

# XDocument
``` csharp
private void LoadXml()
{
    XDocument xdoc = XDocument.Load("config.xml");

    //Run query
    var Lights = from light in xdoc.Descendants("light")
                select new
                {
                    port = light.Attribute("port").Value,
                    channel = light.Attribute("channel").Value,
                    bright = light.Attribute("brightness").Value,
                };

    //StringBuilder result = new StringBuilder();

    //foreach
    foreach (var light in Lights)
    {
        //result.AppendLine("  " + light.port);
        //result.AppendLine("  " + light.channel);
        //result.AppendLine("  " + light.bright);

        comboBox1.SelectedItem = light.port.ToString();
        channelCombo.SelectedItem = Int32.Parse(light.channel);
        brightness.Text = light.bright;
    }
    //Console.WriteLine(result.ToString());
}
```

_(C# READ and WRITE XML FILE)[https://web.csulb.edu/~pnguyen/cecs475/xml/xmlreadwrite.html]_
``` csharp
 // Create XML docs
static void CreateFunctionalXmlElement() {
 // A 'functional' approach to build an
 // XML element in memory.
 XElement inventory =
  new XElement("Inventory",
   new XElement("Car", new XAttribute("ID", "1"),
    new XElement("Color", "Green"),
    new XElement("Make", "BMW"),
    new XElement("PetName", "Stan")
   )
  );
 // Call ToString() on our XElement.
 Console.WriteLine(inventory);
}

static void CreateFunctionalXmlDoc() {
 XDocument inventoryDoc =
  new XDocument(
   new XDeclaration("1.0", "utf-8", "yes"),
   new XComment("Current Inventory of AutoLot"),
   new XElement("Inventory",
    new XElement("Car", new XAttribute("ID", "1"),
     new XElement("Color", "Green"),
     new XElement("Make", "BMW"),
     new XElement("PetName", "Stan")
    ),
    new XElement("Car", new XAttribute("ID", "2"),
     new XElement("Color", "Pink"),
     new XElement("Make", "Yugo"),
     new XElement("PetName", "Melvin")
    )
   )
  );
 // Display the document and save to disk.
 Console.WriteLine(inventoryDoc);
 inventoryDoc.Save("SimpleInventory.xml");
}

// Build doc from LINQ query
static void CreateXmlDocFromArray() {
 // Create an anonymous array of types.
 var data = new [] {
  new {
   PetName = "Melvin", ID = 10
  },
  new {
   PetName = "Pat", ID = 11
  },
  new {
   PetName = "Danny", ID = 12
  },
  new {
   PetName = "Clunker", ID = 13
  }
 };

 // Now enumerate over the array to build
 // an XElement.
 XElement vehicles =
  new XElement("Inventory",
   from c in data select new XElement("Car",
    new XAttribute("ID", c.ID),
    new XElement("PetName", c.PetName)
   )
  );
 Console.WriteLine(vehicles);
}

// Load XML
static void LoadExistingXml() {
 // Build an XElement from string.
 string myElement =
  @ "<Car ID ='3'> <
  Color > Yellow < /Color> <
  Make > Yugo < /Make> <
  /Car>";
 XElement newElement = XElement.Parse(myElement);
 Console.WriteLine(newElement);
 Console.WriteLine();

 // Load the SimpleInventory.xml file.
 XDocument myDoc = XDocument.Load("SimpleInventory.xml");
 Console.WriteLine(myDoc);
}

}
}
```

# xmlWriter
``` csharp
private void saveConfigBtn_Click(object sender, EventArgs e)
{
    XmlWriter xmlWriter = XmlWriter.Create("config.xml");

    xmlWriter.WriteStartDocument();
    xmlWriter.WriteStartElement("Lights");

    xmlWriter.WriteStartElement("light");
    xmlWriter.WriteAttributeString("port", comboBox1.SelectedItem.ToString());
    xmlWriter.WriteAttributeString("channel", channelCombo.SelectedItem.ToString());
    xmlWriter.WriteAttributeString("brightness", brightness.Text);
    xmlWriter.WriteEndElement();

    xmlWriter.WriteEndDocument();
    xmlWriter.Close();
}
```

# Controls Basic operate
## Form
- Opacity, `this.Opacity = .75;`

## Panel
- Add(), `this.panel1.Controls.Add(_view);`

## ComboBox
- Add(), `_view.portCombo.Items.Add("item");`
- ToString(), `lv.channelCombo.SelectedItem.ToString()`

_[ref](https://stackoverflow.com/questions/6688157/how-to-set-selected-value-from-combobox)_
``` csharp
var toBeSet = new KeyValuePair<string, string>("1", "Contract");
cmbEmployeeStatus.SelectedItem = toBeSet;
cmbEmployeeStatus.SelectedValue = 3;   //or
cmbEmployeeStatus.SelectedValue = intResultFromQuery;   
```

## ListBox
[ref](https://stackoverflow.com/questions/303248/what-is-the-proper-way-to-load-up-a-listbox)
``` csharp
List<Person> people = new List<Person>();
people.Add(new Person { Age = 25, FirstName = "Alex", LastName = "Johnson" });
people.Add(new Person { Age = 23, FirstName = "Jack", LastName = "Jones" });
people.Add(new Person { Age = 35, FirstName = "Mike", LastName = "Williams" });
people.Add(new Person { Age = 25, FirstName = "Gill", LastName = "JAckson" });
this.listBox1.DataSource = people;
this.listBox1.DisplayMember = "FirstName";
this.listBox1.ValueMember = "Age";

//AddRange
ListBox l;
List<MyDataType> myItems = new List<MyDataType>(); // populate this however you like
l.AddRange(myItems.ToArray());

//Add one
ListBox.Items.Add("xxxxx");

//clear
listbox.Items.Clear();

//keep to the bottom
ListBox.TopIndex = ListBox.Items.Count - 1;
```

## Changing Font
`_view.ListBox.Font = new Font(_view.ListBox.Font.Name, _view.ListBox.Font.Size + 1.5F, _view.ListBox.Font.Style, _view.ListBox.Font.Unit);`

## Cast html Color
`System.Drawing.ColorTranslator.FromHtml("#C1CCD4")`

# Visual Studio Shortcut
- constructor, `ctor+tab`
- getter&setter, `prop` or `propg`(with private setter)

# MVC 
<del>`Form`->`Module`->`Controller`->`ViewFeeder`->`View`</del>
`program` -> `form1` -> (`subClass`->`myform`->) `controller` -> `module` and `viewFeeder` -> `view`

![](https://www.codeproject.com/KB/tips/ModelViewController/Figure4.gif)
- _[Simple Example of MVC (Model View Controller) Design Pattern for Abstraction](https://www.codeproject.com/Articles/25057/Simple-Example-of-MVC-Model-View-Controller-Design)_
- _[The Model-View-Controller(MVC) Pattern with C#/WinForms](https://www.codeproject.com/Articles/383153/The-Model-View-Controller-MVC-Pattern-with-Csharp)_
- _[浅谈 MVC、MVP 和 MVVM 架构模式](https://draveness.me/mvx)_
``` csharp
using System.Collections;
using  WinFormMVC.Model;
using  WinFormMVC.View;
using  WinFormMVC.Controller;

namespace UseMVCApplication
{
static class Program
{
    /// The main entry point for the application.
    [STAThread]
    static void Main()
    {
        //Here we are creating a View
        UsersView view = new UsersView();
        view.Visible = false;

        //Here we are creating a list of users
        IList users = new ArrayList();
    
        //Here we are add our "commoners" in the list of users
        users.Add(new User("Vladimir", "Putin", "122", "Government of Russia", User.SexOfPerson.Male));
        users.Add(new User("Barack", "Obama", "123", "Government of USA", User.SexOfPerson.Male));
        users.Add(new User("Stephen", "Harper", "124", "Government of Canada", User.SexOfPerson.Male));
        users.Add(new User("Jean", "Charest", "125", "Government of Quebec", User.SexOfPerson.Male));
     
        //Here we are creating a Controller and passing two
        //parameters: View and list of users (models)
        UsersController controller = new UsersController(view, users);
        controller.LoadView();
        view.ShowDialog();
        }
    }
}
```

__[myTemplate](https://drive.google.com/open?id=13CjFi91jrcOL9Hai-f6_o8jU8CWknM7g)__

# Cross-thread with Invoke and Delegate 
[How to: Make thread-safe calls to Windows Forms controls](https://docs.microsoft.com/en-us/dotnet/framework/winforms/controls/how-to-make-thread-safe-calls-to-windows-forms-controls)

``` csharp
private void Button1_Click(object sender, EventArgs e)
{
    thread2 = new Thread(new ThreadStart(SetText));
    thread2.Start();
    Thread.Sleep(1000);
}

private void WriteTextSafe(string text)
{
    if (textBox1.InvokeRequired)
    {
        var d = new SafeCallDelegate(WriteTextSafe);
        Invoke(d, new object[] { text });
    }
    else
    {
        textBox1.Text = text;
    }
}

private void SetText()
{
    WriteTextSafe("This text was set safely.");
}
```

# CMD Command in C#
- [CMD from Windows Form](https://www.codeproject.com/Questions/173331/CMD-from-Windows-Form)
- [process.start() arguments](https://stackoverflow.com/questions/3268022/process-start-arguments)
- [How To: Execute command line in C#, get STD OUT results](https://stackoverflow.com/questions/206323/how-to-execute-command-line-in-c-get-std-out-results)

``` csharp
//example1
ProcessStartInfo processtartinfo = new ProcessStartInfo();
processtartinfo.Arguments = "/C netsh advfirewall set publicprofile state off";
processtartinfo.WindowStyle = ProcessWindowStyle.Hidden;
processtartinfo.FileName = "CMD.exe";
System.Diagnostics.Process.Start(processtartinfo);

// example2
var p = new System.Diagnostics.Process();
p.StartInfo.FileName = "cmd.exe";
p.StartInfo.Arguments = "/c echo Foo && echo Bar";
p.StartInfo.RedirectStandardOutput = true;
p.StartInfo.UseShellExecute = false;
p.StartInfo.CreateNoWindow = true;
p.Start();
p.StandardOutput.ReadToEnd().Dump();

//no cmd needed
System.Diagnostics.Process.Start("netsh", "advfirewall set privateprofile state off");

//mklink example
ProcessStartInfo ProcessInfo = new ProcessStartInfo("cmd.exe", "/c mklink " + arg);
Process.Start(ProcessInfo);
```

# Destructor Dispose and Finalize in C#
[Why does my destructor never run?](https://stackoverflow.com/questions/6931305/why-does-my-destructor-never-run)

``` csharp
class User
{
    public User()
    {
        Console.WriteLine("An Instance of class created");
    }
    // Destructor
    ~User()
    {
        Console.WriteLine("An Instance of class destroyed");
    }
}

//Dispose
protected override void Dispose(bool disposing)
{
   System.Diagnostics.Trace.WriteLine(
      "Form1.Dispose " + (disposing ? "disposing " : "")
      + this.GetHashCode().ToString());
   base.Dispose (disposing);
}

//Dispose in Form designer
protected override void Dispose(bool disposing)
{
    if (disposing && (components != null))
    {
        components.Dispose();
    }
    base.Dispose(disposing);
    
    //stop
    _controller.Operate(2, 10, 0);
}

//in formcolsed event
this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(Form1_FormClosed);
```

[Destructor vs Dispose vs Finalize](https://social.msdn.microsoft.com/Forums/vstudio/en-US/34d2416b-abb1-4351-a797-33cda12d7b8b/destructor-vs-dispose-vs-finalize?forum=csharpgeneral)
> Destructor:
> - Destructor will be written in a class to clean the memory used by the instances of that class. A destructor cannot be explicitly called in C#. It will be called by GC process while collecting the garbage.
> Dispose:
> - Dispose method Must be called explicitly at any time just like any other method. Contains the code to clean up the Unmanaged code accessed by the object
> Finalize
> - Finalize Method is the code to clean up the memory used by the class. A finalize method can be called explicitly by using the “objectname.Finalize()” syntax

# File and Folder Operate
[How to: Create a File or Folder (C# Programming Guide)](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/file-system/how-to-create-a-file-or-folder)
`System.IO.Directory.CreateDirectory(pathString);`

# Readonly and const
[final vs. readonly & const](https://www.javacamp.org/javavscsharp/readonly.html)

# Parse Hex String
[Converting Hex string to Int in C#](https://theburningmonk.com/2010/02/converting-hex-to-int-in-csharp/)
``` csharp
string hex = "142CBD";
// this returns 1322173
int intValue = int.Parse(hex, System.Globalization.NumberStyles.HexNumber);

//sith string have prefixedHex
string prefixedHex = "0x142CBD";
// this works, and returns 1322173
int intValue = Convert.ToInt32(prefixedHex , 16);
```

# Crop a image
``` csharp
private static Bitmap cropPoint(Bitmap sourceImage, double x1, double y1, double x2, double y2, double x3, double y3, double x4, double y4)
{
    TextureBrush brush = new TextureBrush(sourceImage);
    Bitmap b = new Bitmap(sourceImage.Width, sourceImage.Height);
    Graphics g = Graphics.FromImage(b);
    GraphicsPath path = new GraphicsPath();
    PointF Corner1 = new PointF((float)x1, (float)y1);
    PointF Corner2 = new PointF((float)x2, (float)y2);
    PointF Corner3 = new PointF((float)x3, (float)y3);
    PointF Corner4 = new PointF((float)x4, (float)y4);
    path.AddPolygon(new[] { Corner1, Corner2, Corner3, Corner4 });
    g.FillPath(brush, path);
    return b;
}
```

# Out & Ref
[What's the difference between the 'ref' and 'out' keywords?](https://stackoverflow.com/questions/388464/whats-the-difference-between-the-ref-and-out-keywords)
>  ref tells the compiler that the object is initialized before entering the function, while out tells the compiler that the object will be initialized inside the function.
>
> So while ref is two-ways, out is out-only.
``` csharp
public void myFunction(out MyClass someClass)
```

# Reference
- [How to Read and Write from the Serial Port](https://stackoverflow.com/questions/1243070/how-to-read-and-write-from-the-serial-port)
- [LINQ to read XML](https://stackoverflow.com/questions/670563/linq-to-read-xml)