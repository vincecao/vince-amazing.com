---
title: UWP LEARNING
date: 2017-03-26 11:27:39
tags:
- UWP
- Csharp
categories: Notes
---

Here is the VINCE's UWP learning notes.
顺便做了一个UWP，[点这里瞧瞧看](https://github.com/vincecao/IRCA-in-UWP)
<!--more-->
---
# TIPS

## Audio capture

[Windows 10 Universal Windows Platform – Audio Recorder](https://comentsys.wordpress.com/2015/05/21/windows-10-universal-windows-platform-audio-recorder/)

### Audio playBack

[UWP How to play sound from wav file/resource?](https://social.msdn.microsoft.com/Forums/windowsapps/en-US/ddb1b7f1-e988-40c7-8e1e-eaf6d8573ec2/uwp-how-to-play-sound-from-wav-fileresource?forum=wpdevelop)

## JOSN/json.NET

### Saving data into JSON

[Introducing JSON](http://www.json.org)
[Json.NET](http://www.newtonsoft.com/json)
[Using JSON.NET to write Json file in UWP](http://stackoverflow.com/questions/41325362/using-json-net-to-write-json-file-in-uwp)

``` cs
Items items = new Items(imageId, objectArr, objectData, App.image);

string json = JsonConvert.SerializeObject(items);
var file = await ApplicationData.Current.LocalFolder.CreateFileAsync(imageId + "myconfig.json");
```

### JsonConvert DeserializeObject using Josn.Net

[Deserializing JSON object into a C# list](http://stackoverflow.com/questions/16019729/deserializing-json-object-into-a-c-sharp-list)

``` cs
public void TestMethod1()
{
    var items = new List<Item>
                    {
                        new Item { Att1 = "ABC", Att2 = "123" },
                        new Item { Att1 = "EFG", Att2 = "456" },
                        new Item { Att1 = "HIJ", Att2 = "789" }
                    };
    var root = new Root() { Items = items };
    var itemsSerialized = JsonConvert.SerializeObject(items);
    var rootSerialized = JsonConvert.SerializeObject(root);

    //This works
    var deserializedItemsFromItems = JsonConvert.DeserializeObject<List<Item>>(itemsSerialized);

    //This works
    var deserializedRootFromRoot = JsonConvert.DeserializeObject<Root>(rootSerialized);

    //This will fail.  YOu serialized it as root and tried to deserialize as List<Item>
    var deserializedItemsFromRoot = JsonConvert.DeserializeObject<List<Item>>(rootSerialized);

    //This will fail also for the same reason
    var deserializedRootFromItems = JsonConvert.DeserializeObject<Root>(itemsSerialized);
}

class Root
{
    public IEnumerable<Item> Items { get; set; }
}

class Item
{
    public string Att1 { get; set; }
    public string Att2 { get; set; }
}
```

### 使用JSON代码片段改写/Using JSON to store and then read from LocalFolder

``` cs
public class Product
{
    public string Name { get; set; }
    //public string Expiry { get; set; }
    public string[] Sizes { get; set; }
    public int Int { get; set; }
    public string[,] MulArr { get; set; }
}

public sealed partial class MainPage : Page
{

    private static string JsonFile = "myconfig.json";    //your file name
    public Product NEW;

    public MainPage()
    {
        this.InitializeComponent();

    }

    protected async override void OnNavigatedTo(NavigationEventArgs e)
    {
        base.OnNavigatedTo(e);
        Product product = new Product()
        {
            Name = "Apple",
            //product.Expiry = new DateTime(2008, 12, 28);
            Sizes = new string[] { "Small" },
            Int = 40,
            MulArr = new string[5, 4]
        };
        product.MulArr[0, 1] = "vg";
        product.MulArr[1, 1] = "ni";
        product.MulArr[0, 2] = "ge";

        saveJson(product);

        NEW = await LoadFromJsonAsync();
   }

    public async void saveJson(Product product)
    {
        // serialize JSON to a string
        string json = JsonConvert.SerializeObject(product);

        // write string to a file
        var file = await ApplicationData.Current.LocalFolder.CreateFileAsync("myconfig.json");
        await FileIO.WriteTextAsync(file, json);
    }


    public async Task<Product> LoadFromJsonAsync()
    {
        string JsonString = await DeserializeFileAsync(JsonFile);
        if (JsonString != null)
            //return (List<Product>)JsonConvert.DeserializeObject(JsonString, typeof(List<Product>));
            return JsonConvert.DeserializeObject<Product>(JsonString);
        return null;
    }

    private static async Task<string> DeserializeFileAsync(string fileName)
    {
        try
        {
            StorageFile localFile = await ApplicationData.Current.LocalFolder.GetFileAsync(fileName);
            return await FileIO.ReadTextAsync(localFile);
        }
        catch (FileNotFoundException)
        {
            return null;
        }
    }
}
```

## Local setting store

[Roaming and Local Settings in UWP](http://pmichaels.net/2016/05/06/roaming-and-local-settings-in-uwp/)
[读书笔记4：uwp应用设置储存](http://www.cnblogs.com/by-admini22/p/5460176.html)
[如何将自定义对象集合保存至本地存储区](https://code.msdn.microsoft.com/windowsapps/CSWinStoreAppSaveCollection-bed5d6e6)

[Printing 2D array in matrix format](http://stackoverflow.com/questions/12826760/printing-2d-array-in-matrix-format)

[how to read a text file in windows universal app](http://stackoverflow.com/questions/34583303/how-to-read-a-text-file-in-windows-universal-app)
[Getting all files in UWP app folder](http://stackoverflow.com/questions/33742696/getting-all-files-in-uwp-app-folder)
[Store and retrieve settings and other app data](https://docs.microsoft.com/en-us/windows/uwp/app-settings/store-and-retrieve-app-data)
**中文版**[快速入门：本地应用数据 (XAML)](https://msdn.microsoft.com/zh-cn/library/windows/apps/xaml/hh700361)

 - UInt8, Int16, UInt16, Int32, UInt32, Int64, UInt64, Single, Double
 - Boolean
 - Char16, String
 - DateTime, TimeSpan
 - GUID, Point, Size, Rect

``` cs
string mySetting = Windows.Storage.ApplicationData.Current.LocalSettings.Values["MySetting"]?.ToString();
Windows.Storage.ApplicationData.Current.LocalSettings.Values["MySetting"] = "1";`
```

## Save writeableBitmapImage

[Storing a BitmapImage in LocalFolder - UWP](http://stackoverflow.com/questions/34362838/storing-a-bitmapimage-in-localfolder-uwp)

``` cs
public static async Task SaveBitmapToFileAsync(WriteableBitmap image, string imageId)
{
  StorageFolder pictureFolder = await ApplicationData.Current.LocalFolder.CreateFolderAsync("ProfilePictures", CreationCollisionOption.OpenIfExists);
  var file = await pictureFolder.CreateFileAsync(imageId + ".jpg", CreationCollisionOption.ReplaceExisting);

  using (var stream = await file.OpenStreamForWriteAsync())
  {
    BitmapEncoder encoder = await BitmapEncoder.CreateAsync(BitmapEncoder.JpegEncoderId, stream.AsRandomAccessStream());
    var pixelStream = image.PixelBuffer.AsStream();
    byte[] pixels = new byte[image.PixelBuffer.Length];

    await pixelStream.ReadAsync(pixels, 0, pixels.Length);

    encoder.SetPixelData(BitmapPixelFormat.Bgra8, BitmapAlphaMode.Ignore, (uint)image.PixelWidth, (uint)image.PixelHeight, 96, 96, pixels);

    await encoder.FlushAsync();
  }
}
```

serveral other reference:
[UWP: Save a BitmapImage as File](https://codedocu.com/Details?d=1592&a=9&f=181&l=0&v=d&t=UWP:-Save-a-BitmapImage--as-File)
[c# UWP Save StorageFile Without Dialog](http://stackoverflow.com/questions/35911448/c-sharp-uwp-save-storagefile-without-dialog)
[win10 uwp 读取保存WriteableBitmap 、BitmapImage](http://codecloud.net/135976.html)
[Storing a BitmapImage in LocalFolder - UWP](http://stackoverflow.com/questions/34362838/storing-a-bitmapimage-in-localfolder-uwp)

## count all file in local data

``` cs
try
{
  StorageFolder save = await ApplicationData.Current.LocalFolder.GetFolderAsync("Save");
  var files = await save.GetFilesAsync();
  imageId = files.Count;                
}
catch
{
}
```

## output String into TXT

[Create, write, and read a file](https://docs.microsoft.com/en-us/windows/uwp/files/quickstart-reading-and-writing-files)

``` cs
Windows.Storage.StorageFolder storageFolder = Windows.Storage.ApplicationData.Current.LocalFolder;
Windows.Storage.StorageFile sampleFile = await storageFolder.CreateFileAsync(@"\\\Assets\sample.txt", Windows.Storage.CreationCollisionOption.ReplaceExisting);
await Windows.Storage.FileIO.WriteTextAsync(sampleFile, "abc");
```

## import photos

[Choosing an image from gallery or camera a bit better in Universal Windows apps](https://blog.kulman.sk/choosing-an-image-from-gallery-or-camera-in-uwp)

### Capture photo from camera


``` cs
protected override void OnNavigatedTo(NavigationEventArgs e)
{
    base.OnNavigatedTo(e);
    doPickImage();
}

    private async void doPickImage()
{
    var ccu = new CameraCaptureUI();
    var file = await ccu.CaptureFileAsync(CameraCaptureUIMode.Photo);

    if (file != null)
    {
        await ProcessFile(file);
    }else{
        throw new NotImplementedException();
    }

}

private async Task ProcessFile(StorageFile file)
{
    if (file != null){
        var stream = await file.OpenAsync(Windows.Storage.FileAccessMode.Read);
        //using writeableBitmap
        BitmapDecoder decoder = await BitmapDecoder.CreateAsync(stream);
        App.image = new WriteableBitmap((int)decoder.PixelWidth, (int)decoder.PixelHeight);
        //using bitmap
        //var image = new BitmapImage();
        App.image.SetSource(stream);
        imageView.Source = App.image;
    }else{
        throw new NotImplementedException();
    }
}
```

### Import photo from gallery

``` cs
protected override void OnNavigatedTo(NavigationEventArgs e)
{
    base.OnNavigatedTo(e);
    doPickImage();
}

    private async void doPickImage()
{
    var openPicker = new FileOpenPicker
    {
        ViewMode = PickerViewMode.Thumbnail,
        SuggestedStartLocation = PickerLocationId.PicturesLibrary
    };
    openPicker.FileTypeFilter.Add(".jpg");
    var file = await openPicker.PickSingleFileAsync();

    if (file != null)
    {
        await ProcessFile(file);
    }
    else
    {
        throw new NotImplementedException();
    }
}

private async Task ProcessFile(StorageFile file)
{
    if (file != null){
        var stream = await file.OpenAsync(Windows.Storage.FileAccessMode.Read);
        //using writeableBitmap
        BitmapDecoder decoder = await BitmapDecoder.CreateAsync(stream);
        App.image = new WriteableBitmap((int)decoder.PixelWidth, (int)decoder.PixelHeight);
        //using bitmap
        //var image = new BitmapImage();
        App.image.SetSource(stream);
        imageView.Source = App.image;
    }else{
        throw new NotImplementedException();
    }
}
```

## Adaptive gird view

need to NuGet `Microsoft.Toolkit.Uwp.UI.Controls`
``` xml
<Page.Resources>
    <DataTemplate x:Key="MyPhotos">
        <Grid
            Background="White"
            BorderBrush="Black"
            BorderThickness="1">
            <Image
                Source="{Binding ImageUrl}"
                Stretch="UniformToFill"
                HorizontalAlignment="Center"
                VerticalAlignment="Center"/>
        </Grid>
    </DataTemplate>
</Page.Resources>
<Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    <UWPTookit:AdaptiveGridView x:Name="myAdaptiveGridView"
                               ItemHeight="300"
                               DesiredWidth="300"
                               SelectionMode="Single"
                               IsItemClickEnabled="True"
                               ItemTemplate="{StaticResource MyPhotos}"/>
</Grid>
```

``` cs
public sealed partial class childPage : Page
{
    public childPage()
    {
        this.InitializeComponent();
    }

    protected override void OnNavigatedTo(NavigationEventArgs e)
    {
        base.OnNavigatedTo(e);

        List<MyImage> data = new List<MyImage>
        {
            new MyImage()
            {
                ImageUrl = "ms-appx:///Assets/sample/1.jpg"
            },
            new MyImage()
            {
                ImageUrl = "ms-appx:///Assets/sample/2.jpg"
            },
            new MyImage()
            {
                ImageUrl = "ms-appx:///Assets/sample/3.jpg"
            },
            new MyImage()
            {
                ImageUrl = "ms-appx:///Assets/sample/4.jpg"
            }
        };
        myAdaptiveGridView.ItemsSource = data;
    }

    class MyImage
    {
        public string ImageUrl { get; set; }
    }
}
```

## Using inkCanvas

[Digital Ink - Ink Interaction in Windows 10](https://msdn.microsoft.com/en-us/magazine/mt590975.aspx)
[Use inking and speech to support natural input (10 by 10)](https://blogs.windows.com/buildingapps/2015/09/08/going-beyond-keyboard-mouse-and-touch-with-natural-input-10-by-10/#C5dey9hbXhuGHr4R.97)
[How to render InkCanvas to an image in UWP Windows 10 application?](http://stackoverflow.com/questions/32153880/how-to-render-inkcanvas-to-an-image-in-uwp-windows-10-application)
[Save InkCanvas strokes as png /jpg image in Windows 10](http://stackoverflow.com/questions/33523831/save-inkcanvas-strokes-as-png-jpg-image-in-windows-10)

``` cs
Color col = radomColor();
SolidColorBrush colBrush = new SolidColorBrush(col);

InkDrawingAttributes inkDrawingAttributes = new InkDrawingAttributes();
inkDrawingAttributes.Color = col;
inkDrawingAttributes.IgnorePressure = false;
inkDrawingAttributes.FitToCurve = true;
inkDrawingAttributes.Size = new Size(20, 20);
MyCanvas.InkPresenter.UpdateDefaultDrawingAttributes(inkDrawingAttributes);
MyCanvas.InkPresenter.InputDeviceTypes = Windows.UI.Core.CoreInputDeviceTypes.Mouse | Windows.UI.Core.CoreInputDeviceTypes.Pen | Windows.UI.Core.CoreInputDeviceTypes.Touch;
```

## Random Color

`Color.Fromarg()` the first item is alpha 1~254

``` cs
private Color radomColor()
{
    Random rnd = new Random();
    Byte[] b = new Byte[4];
    rnd.NextBytes(b);
    Color color = Color.FromArgb(b[0], b[1], b[2], b[3]);
    return color;
}
```

## Drawing on the Canvas

Canvas need to set the height or width in advence

``` xml
<Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    <StackPanel>
        <StackPanel Orientation="Horizontal" Background="AliceBlue">
            <TextBlock Name="label1" />
            <TextBlock Name="label2" Margin="15,0,0,0" />
        </StackPanel>
        <Canvas Name="MyCanvas" Margin="0,0,0,0" Background="White" Height="300" HorizontalAlignment="Stretch" VerticalAlignment="Stretch"/>
        <!--<InkCanvas Name="MyCanvas" Margin="0,50,0,0" Height="300" HorizontalAlignment="Stretch" VerticalAlignment="Stretch"/>-->
    </StackPanel>
</Grid>
```

``` cs
public sealed partial class MainPage : Page
{
    InkManager _inkKhaled = new Windows.UI.Input.Inking.InkManager();
    private uint _penID;
    private uint _touchID;
    private Point _previousContactPt;
    private Point currentContactPt;
    private double x1;
    private double y1;
    private double x2;
    private double y2;


    public MainPage()
    {
        this.InitializeComponent();

        //MyCanvas.AddHandler(InkCanvas.PointerMovedEvent, new PointerEventHandler(InkCanvas_PointerMoving), true);
        //MyCanvas.PointerMoved += new PointerEventHandler(InkCanvas_PointerMoving);
        MyCanvas.PointerPressed += new PointerEventHandler(MyCanvas_PointerPressed);
        MyCanvas.PointerMoved += new PointerEventHandler(MyCanvas_PointerMoved);
        MyCanvas.PointerReleased += new PointerEventHandler(MyCanvas_PointerReleased);
        MyCanvas.PointerExited += new PointerEventHandler(MyCanvas_PointerReleased);

    }

    private void InkCanvas_PointerMoving(object sender, PointerRoutedEventArgs e)
    {
        try
        {
            label1.Text = "X: " + e.GetCurrentPoint(this).Position.X;
            label2.Text = "Y: " + e.GetCurrentPoint(this).Position.Y;
        }
        catch
        {

        }
    }

    #region PointerEvents
    private void MyCanvas_PointerReleased(object sender, PointerRoutedEventArgs e)
    {
        if (e.Pointer.PointerId == _penID)
        {
            Windows.UI.Input.PointerPoint pt = e.GetCurrentPoint(MyCanvas);

            // Pass the pointer information to the InkManager.
            _inkKhaled.ProcessPointerUp(pt);
        }

        else if (e.Pointer.PointerId == _touchID)
        {
            // Process touch input
        }

        _touchID = 0;
        _penID = 0;

        // Call an application-defined function to render the ink strokes.


        e.Handled = true;
    }

    private void MyCanvas_PointerMoved(object sender, PointerRoutedEventArgs e)
    {
        if (e.Pointer.PointerId == _penID)
        {
            PointerPoint pt = e.GetCurrentPoint(MyCanvas);

            currentContactPt = pt.Position;
            x1 = _previousContactPt.X;
            y1 = _previousContactPt.Y;
            x2 = currentContactPt.X;
            y2 = currentContactPt.Y;

            label1.Text = "x:" + x1 + ", y:" + y1;
            label2.Text = "x:" + x2 + ", y:" + y2;

            if (Distance(x1, y1, x2, y2) > 2.0) // We need to developp this method now
            {
                Line line = new Line()
                {
                    X1 = x1,
                    Y1 = y1,
                    X2 = x2,
                    Y2 = y2,
                    StrokeThickness = 4.0,
                    Stroke = new SolidColorBrush(Colors.Green)
                };

                _previousContactPt = currentContactPt;

                // Draw the line on the canvas by adding the Line object as
                // a child of the Canvas object.
                MyCanvas.Children.Add(line);

                // Pass the pointer information to the InkManager.
                _inkKhaled.ProcessPointerUpdate(pt);
            }
        }

        else if (e.Pointer.PointerId == _touchID)
        {
            // Process touch input
        }

    }

    private double Distance(double x1, double y1, double x2, double y2)
    {
        double d = 0;
        d = Math.Sqrt(Math.Pow((x2 - x1), 2) + Math.Pow((y2 - y1), 2));
        return d;
    }

    private void MyCanvas_PointerPressed(object sender, PointerRoutedEventArgs e)
    {
        // Get information about the pointer location.
        PointerPoint pt = e.GetCurrentPoint(MyCanvas);
        _previousContactPt = pt.Position;

        // Accept input only from a pen or mouse with the left button pressed.
        PointerDeviceType pointerDevType = e.Pointer.PointerDeviceType;
        if (pointerDevType == PointerDeviceType.Pen || pointerDevType == PointerDeviceType.Touch ||
                pointerDevType == PointerDeviceType.Mouse &&
                pt.Properties.IsLeftButtonPressed)
        {
            // Pass the pointer information to the InkManager.
            _inkKhaled.ProcessPointerDown(pt);
            _penID = pt.PointerId;

            e.Handled = true;
        }

        //else if (pointerDevType == PointerDeviceType.Touch)
        //{
        //    // Process touch input
        //}
    }

    #endregion

    /// <summary>
    /// Invoked when this page is about to be displayed in a Frame.
    /// </summary>
    /// <param name="e">Event data that describes how this page was reached.  The Parameter
    /// property is typically used to configure the page.</param>
    protected override void OnNavigatedTo(NavigationEventArgs e)
    {
    }

    private Color radomColor()
    {
        Random rnd = new Random();
        Byte[] b = new Byte[4];
        rnd.NextBytes(b);
        Color color = Color.FromArgb(b[0], b[1], b[2], b[3]);
        return color;
    }
}
```

## InputTextDialogAsync

``` cs
private async void InputTextDialogAsync(string title)
{
    TextBox inputTextBox = new TextBox();
    inputTextBox.AcceptsReturn = false;
    inputTextBox.Height = 32;
    ContentDialog dialog = new ContentDialog();
    dialog.Content = inputTextBox;
    dialog.Title = title;
    dialog.IsSecondaryButtonEnabled = true;
    dialog.PrimaryButtonText = "Enter";
    dialog.SecondaryButtonText = "Cancel";
    if (await dialog.ShowAsync() == ContentDialogResult.Primary && inputTextBox.Text == App.passWord)
    {
        headerTitle.Text = "Parent Configuration";
        myFrame.Navigate(typeof(parentPage));
    }
    else
    {
        ChildListBoxItem.IsSelected = true;
        headerTitle.Text = "Child";
        myFrame.Navigate(typeof(childPage));
    }
}
```

## AutoSuggestBox

[UWP开发随笔——UWP新控件！AutoSuggestBox！](http://www.tuicool.com/articles/7NfMb2)

``` cs
private void AutoSuggestBox_QuerySubmitted(AutoSuggestBox sender, AutoSuggestBoxQuerySubmittedEventArgs args)
{
    if (args.ChosenSuggestion != null)
        textBlock.Text = args.ChosenSuggestion.ToString();
    else
        textBlock.Text = sender.Text;
}
```

---

# SimpleVisualStateTriggerExample

``` xml
<Grid Name="ColorGrid" Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
  <VisualStateManager.VisualStateGroups>
      <VisualStateGroup x:Name="VisualStateGroup">
          <VisualState x:Name="VisualStatePhone">
              <VisualState.StateTriggers>
                  <AdaptiveTrigger MinWindowWidth="0"/>
              </VisualState.StateTriggers>
              <VisualState.Setters>
                  <Setter Target="ColorGrid.Background" Value="Red" />
                  <Setter Target="MessageTextBlock.FontSize" Value="18" />
              </VisualState.Setters>
          </VisualState>
          <VisualState x:Name="VisualStateTablet">
              <VisualState.StateTriggers>
                  <AdaptiveTrigger MinWindowWidth="600" />
              </VisualState.StateTriggers>
              <VisualState.Setters>
                  <Setter Target="ColorGrid.Background" Value="Yellow" />
                  <Setter Target="MessageTextBlock.FontSize" Value="36" />                        
              </VisualState.Setters>
          </VisualState>
          <VisualState x:Name="VisualStateDesktop">
              <VisualState.StateTriggers>
                  <AdaptiveTrigger MinWindowWidth="800" />
              </VisualState.StateTriggers>
              <VisualState.Setters>
                  <Setter Target="ColorGrid.Background" Value="Blue" />
                  <Setter Target="MessageTextBlock.FontSize" Value="54" />                        
              </VisualState.Setters>
          </VisualState>
      </VisualStateGroup>
  </VisualStateManager.VisualStateGroups>

  <TextBlock Name="MessageTextBlock" Text="Hello VisualStateManager" />

</Grid>
```

---

# Frame

## Create New BlankPage.xaml

`Finanical.xaml` and `Food.xaml`

## MainPage.xaml

``` xml
<SplitView.Pane>
  ...
</SplitView.Pane>
<SplitView.Content>
  <Frame Name="MyFrame"></Frame>
</SplitView.Content>
```

## MainPage.xaml.cs

``` cs
public MainPage()
{
  this.InitializeComponent();
  MyFrame.Navigate(typeof(Finanical));
}

//...

private void ListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
  if (Financial.IsSelected)
  {
    MyFrame.Navigate(typeof(Finanical));
    TitleTextBlock.Text = "Finanical";
  }
  else if (Food.IsSelected)
  {
    MyFrame.Navigate(typeof(Food));
    TitleTextBlock.Text = "Food";
  }
}
```
---

# XAMLResources
### /MainPage.xaml

``` xml
<Page
    x:Class="XAMLResources.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:XAMLResources"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d">
    <Page.Resources>
        <ResourceDictionary>
            <ResourceDictionary.MergedDictionaries>
                <ResourceDictionary Source="Dictionary1.xaml" />
                <ResourceDictionary Source="Dictionary2.xaml" />
            </ResourceDictionary.MergedDictionaries>
        </ResourceDictionary>
    </Page.Resources>
    <StackPanel>
        <TextBlock Text="{StaticResource greeting}"
             Foreground="{StaticResource brush}" />
        <Button Content="My Button Style Example"
                Height="100"
                Style="{StaticResource MyButtonStyle}" />
    </StackPanel>
</Page>

```

### /App.xaml

``` xml
<Application
    x:Class="XAMLResources.App"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:XAMLResources"
    RequestedTheme="Light">
    <Application.Resources>
        <SolidColorBrush x:Key="MyBrush" Color="Brown" />
        <Style TargetType="Button" x:Key="MyButtonStyle">
            <Setter Property="Background" Value="Blue" />
            <Setter Property="FontFamily" Value="Arial Black" />
            <Setter Property="FontSize" Value="36" />
        </Style>
    </Application.Resources>
</Application>
```
### /Dictionary1.xaml

``` xml
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:XAMLResources">
    <SolidColorBrush x:Key="brush" Color="Red"/>
</ResourceDictionary>
```
### /Dictionary2.xaml

``` xml
<ResourceDictionary
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:XAMLResources">
    <x:String x:Key="greeting">Hello world</x:String>
</ResourceDictionary>
```
---

# Canvas

``` xml
<Page
    x:Class="ShapesExample.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:ShapesExample"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d">

    <Canvas>
        <Line X1="10" X2="200" Y1="10" Y2="10" Stroke="Black" Fill="Black" StrokeThickness="5" StrokeEndLineCap="Triangle" />
        <Line X1="58" X2="10" Y1="25" Y2="100" Stroke="Black" Fill="Black" StrokeThickness="5" StrokeEndLineCap="Round" StrokeStartLineCap="Round" />
        <Line X1="110" X2="58" Y1="100" Y2="25" Stroke="Black" Fill="Black" StrokeThickness="5" StrokeLineJoin="Round" StrokeStartLineCap="Round" />
        <Line X1="110" X2="10" Y1="100" Y2="100" Stroke="Black" Fill="Black" StrokeThickness="5" StrokeLineJoin="Round" StrokeStartLineCap="Round" />

        <Polyline Canvas.Left="150"
                  Canvas.Top="0"
                  Stroke="Black"
                  StrokeThickness="5"
                  Fill="Red"
                    Points="50,25 0,100 100,100 50,25" StrokeLineJoin="Round" StrokeStartLineCap="Round" StrokeEndLineCap="Round" />

        <TextBlock Name="HelloTextBlock"
            Canvas.Left="50"
            Canvas.Top="150"
            FontSize="24"
            Text="Shapes Example">
        </TextBlock>

        <Rectangle Canvas.Top="200" Canvas.Left="0" Height="50" Width="100" Fill="Yellow" Canvas.ZIndex="100" />

        <Ellipse Stroke="Blue" Width="50" Height="100" Canvas.Left="10" Canvas.Top="200" StrokeThickness="10"  Canvas.ZIndex="15" />


    </Canvas>
</Page>

```
---

# hamburger / 汉堡菜单
## 乞丐Bob版/Poolman

``` xml
<Grid Background="{ThemeResource ApplicationPageBackgroundThemeBrush}">
    <Grid.RowDefinitions>
        <RowDefinition Height="Auto"/>
        <RowDefinition Height="*"/>
    </Grid.RowDefinitions>
    <RelativePanel>
        <Button Name="HamburgerButton"
                FontFamily="Segoe MDL2 Assets"
                Content="&#xE700;" FontSize="36"
                Click="HamburgerButton_Click"/>
    </RelativePanel>
    <SplitView Name="MySplitView"
               Grid.Row="1"
               DisplayMode="CompactOverlay"
               OpenPaneLength="200"
               CompactPaneLength="56"
               HorizontalAlignment="Left">
        <SplitView.Pane>
            <ListBox SelectionMode="Single"
                     Name="IconsListBox"
                     SelectionChanged="IconsListBox_SelectionChanged">
                <ListBoxItem Name="ShareListBoxItem">
                    <StackPanel Orientation="Horizontal">
                        <TextBlock FontFamily="Segoe MDL2 Assets" Text="&#xE72D;" FontSize="36"/>
                        <TextBlock Text="Share" FontSize="24" Margin="20,0,0,0"/>
                    </StackPanel>
                </ListBoxItem>
                <ListBoxItem Name="FavoritesListBoxItem">
                    <StackPanel Orientation="Horizontal">
                        <TextBlock FontFamily="Segoe MDL2 Assets" Text="&#xE734;" FontSize="36"/>
                        <TextBlock Text="Favorites" FontSize="24" Margin="20,0,0,0"/>
                    </StackPanel>
                </ListBoxItem>
                <ListBoxItem />
            </ListBox>
        </SplitView.Pane>
        <SplitView.Content>
            <TextBlock Name="ResultTextBlock" />
        </SplitView.Content>

    </SplitView>
</Grid>
```

``` cs
private void HamburgerButton_Click(object sender, RoutedEventArgs e)
{
    MySplitView.IsPaneOpen = !MySplitView.IsPaneOpen;
}

private void IconsListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    if (ShareListBoxItem.IsSelected) { ResultTextBlock.Text = "Share"; }
    else if (FavoritesListBoxItem.IsSelected) { ResultTextBlock.Text = "Favorites"; }
}
```

## 土豪版/Richman

[Implementing an Awesome Hamburger Button with XAML’s new SplitView control in Windows 10](http://blog.jerrynixon.com/2015/04/implementing-hamburger-button-with.html)

---
# Controls (UWP20 & 25/26)

## Part One

### ROW & COLUMN

``` xml
<Grid Background="Black">
  <Grid.RowDefinitions>
    <RowDefinition Height="*" />
    <RowDefinition Height="*" />
    <RowDefinition Height="*" />
  </Grid.RowDefinitions>
  <Grid.ColumnDefinitions>
    <ColumnDefinition Width="*" />
    <ColumnDefinition Width="*" />
    <ColumnDefinition Width="*" />
  </Grid.ColumnDefinitions>
</Grid>

```

Auto - use the largest value of elements it contains to define the width / height

`*` (Star Sizing) - Utilize all the available space

`1*` - Of all available space, give me 1 "share"
`2*` - Of all available space, give me 2 "shares"
`3*` - Of all available space, give me 3 "shares"

Elements put themselves into rows and columns using attached property syntax:

``` xml
  ...
  ...
  <Button Grid.Row="0" />
</Grid>
```

### CheckBox

``` xml
<CheckBox Name="MyCheckBox" Content="Agree?" Tapped="MyCheckBox_Tapped" />
<TextBlock Name="CheckBoxResultTextBlock" />
```

``` cs
private void MyCheckBox_Tapped(object sender, TappedRoutedEventArgs e)
{
    CheckBoxResultTextBlock.Text = MyCheckBox.IsChecked.ToString();
}
```

### Radio Button

``` xml
<RadioButton Name="YesRadioButton"
            Content="Yes"
            GroupName="MyGroup"
            Checked="RadioButton_Checked" />
<RadioButton Name="NoRadioButton"
            Content="No"
            GroupName="MyGroup"
Checked="RadioButton_Checked" />
<TextBlock Name="RadioButtonTextBlock" />
```

``` cs
private void RadioButton_Checked(object sender, RoutedEventArgs e)
{
    RadioButtonTextBlock.Text = (bool)YesRadioButton.IsChecked ? "Yes" : "No";
}
```

### ComboBox

``` xml
<ComboBox SelectionChanged="ComboBox_SelectionChanged" >
	<ComboBoxItem Content="Fourth" />
	<ComboBoxItem Content="Fifth" />
	<ComboBoxItem Content="Sixth" IsSelected="True" />
</ComboBox>
<TextBlock Name="ComboBoxResultTextBlock" />
```

``` cs
private void ComboBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    if (ComboBoxResultTextBlock == null) return;

    var combo = (ComboBox)sender;
    var item = (ComboBoxItem)combo.SelectedItem;
    ComboBoxResultTextBlock.Text = item.Content.ToString();
}
```

### ListBox

``` xml
<ListBox Name="MyListBox" SelectionMode="Multiple" SelectionChanged="ListBox_SelectionChanged">
    <ListBoxItem Content="First" />
    <ListBoxItem Content="Second" />
    <ListBoxItem Content="Third" />
</ListBox>
<TextBlock Name="ListBoxResultTextBlock" />
```

``` cs
private void ListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    var selectedItems = MyListBox.Items.Cast<ListBoxItem>()
                        .Where(p => p.IsSelected)
                            .Select(t => t.Content.ToString())
                                .ToArray();

    ListBoxResultTextBlock.Text = string.Join(", ", selectedItems);
}
```

### Image

``` xml
<Image Source="Assets/logo.png"
               HorizontalAlignment="Left"
               Width="250"
               Height="50"
               Grid.Row="5"
               Grid.Column="1"
               Stretch="UniformToFill"
               Margin="20,10,0,10" />
```

### ToogleButton

``` xml
<ToggleButton Name="MyToggleButton"
		Content="Premium Option"
        IsThreeState="True"
        Click="MyToggleButton_Click" />
<TextBlock Name="ToggleButtonResultTextBlock" />
```

``` cs
private void MyToggleButton_Click(object sender, RoutedEventArgs e)
{
    ToggleButtonResultTextBlock.Text = MyToggleButton.IsChecked.ToString();
}
```

### ToogleSwitch

``` xml
<ToggleSwitch>
	<ToggleSwitch.OffContent>
    	<TextBlock Text="I'm off right now." />
    </ToggleSwitch.OffContent>
    <ToggleSwitch.OnContent>
    	<TextBlock Text="I'm on!" />
    </ToggleSwitch.OnContent>
</ToggleSwitch>
```

### Result

![](https://i.imgur.com/J4TUTbo.png)

## Part Two

### InnerFlyout

``` xml
<Button Name="MyFlyoutButton"
        Margin="20,0,0,20"
        Grid.Row="3"
        Grid.Column="1"
        Content="Flyout">
    <Button.Flyout>
        <Flyout x:Name="MyFlyout">
            <StackPanel Margin="20,20,20,20">
                <TextBlock Text="I just flew out to say I love you." Margin="0,0,0,10" />
                <Button Name="InnerFlyoutButton"
                        HorizontalAlignment="Right"
                        Content="OK"
                        Click="InnerFlyoutButton_Click" />
            </StackPanel>
        </Flyout>
    </Button.Flyout>
</Button>
```

``` cs
private void InnerFlyoutButton_Click(object sender, RoutedEventArgs e)
{
    MyFlyout.Hide();
}
```

![](https://i.imgur.com/jXdafog.png)

### MenuFlyout

``` xml
<Button Grid.Row="4"
        Margin="20,0,0,20"
        Grid.Column="1"
        Content="FlyoutMenu">
    <Button.Flyout>
        <MenuFlyout Placement="Bottom">
            <MenuFlyoutItem Text="Item 1" />
            <MenuFlyoutItem Text="Item 2" />
            <MenuFlyoutSeparator />
            <MenuFlyoutSubItem Text="Item 3">
                <MenuFlyoutItem Text="Item 4" />
                <MenuFlyoutSubItem Text="Item 5">
                    <MenuFlyoutItem Text="Item 6" />
                    <MenuFlyoutItem Text="Item 7" />
                </MenuFlyoutSubItem>
            </MenuFlyoutSubItem>
            <MenuFlyoutSeparator />
            <ToggleMenuFlyoutItem Text="Item 8" />
        </MenuFlyout>
    </Button.Flyout>
</Button>
```

![](https://i.imgur.com/h3vhmi4.png)

### Auto SuggestBox

``` xml
<AutoSuggestBox Name="MyAutoSuggestBox"
                        Margin="20,0,0,20"
                        Grid.Row="5"
                        Grid.Column="1"
                        HorizontalAlignment="Left"
                        QueryIcon="Find"
                        PlaceholderText="Find Something"
                        Width="200"
                        TextChanged="MyAutoSuggestBox_TextChanged"  />
```

``` cs
//under public sealed partial class MainPage ..
private string[] selectionItems = new string[] { "Ferdinand", "Frank", "Frida", "Nigel", "Tag", "Tanya", "Tanner", "Todd" };

private void MyAutoSuggestBox_TextChanged(AutoSuggestBox sender, AutoSuggestBoxTextChangedEventArgs args)
{
    var autoSuggestBox = (AutoSuggestBox)sender;
    var filtered = selectionItems.Where(p => p.StartsWith(autoSuggestBox.Text)).ToArray();
    autoSuggestBox.ItemsSource = filtered;
}
```

### Slider

``` xml
<Slider Name="MySlider"
                Margin="20,0,0,20"
                Grid.Row="6"
                Grid.Column="1"
                HorizontalAlignment="Left"
                Maximum="100"
                Minimum="0"
                Width="200" />
```
![](https://i.imgur.com/rxX7PBt.png)

### ProgressBar

``` xml
<ProgressBar Name="MyProgressBar"
                     Margin="20,0,0,20"
                     Grid.Row="7"
                     Grid.Column="1"
                     HorizontalAlignment="Left"
                     Width="200"
                     Maximum="100"
                     Value="57" />
```
![](https://i.imgur.com/1pKaPzg.png)

__After Bind__ Change `Value="57"` to `Value="{x:Bind MySlider.Value, Mode=OneWay}"`

![](https://i.imgur.com/c57Fy4Z.png)

### ProgressRing

``` xml
<ProgressRing Name="MyProgressRing"
                      Margin="20,0,0,20"
                      Grid.Row="8"
                      Grid.Column="1"
                      HorizontalAlignment="Left"
                      Width="50"
                      Height="50"
                      IsActive="True" />
```

### TimePicker

``` xml
<TimePicker Grid.Row="0"
                    Grid.Column="1"
                    ClockIdentifier="12HourClock"
                    Margin="20,0,0,20" />
```

### CalendarDatePicker

``` xml
<CalendarDatePicker
            Grid.Row="1"
            Grid.Column="1"
            Margin="20,0,0,20"
            PlaceholderText="choose a date" />
```

#### CalendarView

``` xml
<CalendarView Name="MyCalendarView"
              SelectionMode="Multiple"
              SelectedDatesChanged="MyCalendarView_SelectedDatesChanged" />
<TextBlock Name="CalendarViewResultTextBlock" />
```

__Into Multiple Mode__


``` cs
private void MyCalendarView_SelectedDatesChanged(CalendarView sender, CalendarViewSelectedDatesChangedEventArgs args)
{
    var selectedDates = sender.SelectedDates.Select(p => p.Date.Month.ToString() + "/" + p.Date.Day.ToString()).ToArray();
    var values = string.Join(", ", selectedDates);
    CalendarViewResultTextBlock.Text = values;
}
```

### ScorllViewer

``` xml
<ScrollViewer
    HorizontalScrollBarVisibility="Auto"
    VerticalScrollBarVisibility="Auto">
    <Image Source="Assets/Financial.png" Height="800" Stretch="None" />
</ScrollViewer>
```

__StackPanel 内 ScrollViewer失效， ScrollViewer 内嵌套StackPanel是可以的__

``` xml
<ScrollViewer
        HorizontalScrollBarVisibility="Auto"
        VerticalScrollBarVisibility="Auto">
    <StackPanel>
        <Image Source="Assets/Financial.png" Height="800" Stretch="None" />
        <Image Source="Assets/Financial.png" Height="800" Stretch="None" />
    </StackPanel>
</ScrollViewer>
```

![](https://i.imgur.com/n29Nq56.png)
