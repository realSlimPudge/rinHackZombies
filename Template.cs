  using System;
  using System.Collections;
  using System.Collections.Generic;
  using System.ComponentModel;
  using System.Windows.Forms;
  using System.Drawing;
  using System.Data;
  using FastReport;
  using FastReport.Data;
  using FastReport.Dialog;
  using FastReport.Barcode;
  using FastReport.Table;
  using FastReport.Utils;
  using System.IO;
  using System.Drawing.Imaging;
namespace FastReport
{
  public class ReportScript
  {
     
            

    private void Page1_StartPage(object sender, EventArgs e)
    {
      
      // получаем ссылку на источник данных
      DataSourceBase ds_postgre = Report.GetDataSource("public_images"); 
      DataSourceBase ds_layout = Report.GetDataSource("JSON1");
      if (ds_layout == null || ds_postgre == null)
      {
        throw new InvalidOperationException("Источник данных JSON или JSON1 не найден.");
      }
                                                                         
      // Получаем сам элемент JSON (получаем объект по индексу)
      JsonBase item = ((JsonBase)Report.GetColumnValue("JSON.item"));                                       
      JsonBase parameters =((JsonBase)Report.GetColumnValue("JSON1.item"));               
      
 
       
      int ds_Width;
      int ds_Height;
      if (((Boolean)Report.GetColumnValue("JSON1.item.orientation")))
      {
        ds_Width = ((Int32)Report.GetColumnValue("JSON1.item.width"));
        ds_Height = ((Int32)Report.GetColumnValue("JSON1.item.height"));
      }
      else
      {
        ds_Height = ((Int32)Report.GetColumnValue("JSON1.item.width"));
        ds_Width = ((Int32)Report.GetColumnValue("JSON1.item.height"));
      } 
      
      
      
      
      // Преобразуем массив в список для удобства добавления элементов
      List<string> imageLocationsList = new List<string>{};
      ds_postgre.Init();
      while (ds_postgre.HasMoreRows)
      {
        string imagePath = ((String)Report.GetColumnValue("public_images.url"));
        if (!string.IsNullOrEmpty(imagePath))
        {
          imageLocationsList.Add(imagePath);
        }
        ds_postgre.Next();
      }                 
     
      
      if (imageLocationsList.Count == 0)
      {
        throw new InvalidOperationException("Список изображений пуст");
      }
        
       
      
      // Параметры строк и колонок
      int rows = ((Int32)Report.GetColumnValue("JSON1.item.row"));
      int columns = ((Int32)Report.GetColumnValue("JSON1.item.column"));
      
     
      
      //Создаем окно
      Page1.ReportTitle = new ReportTitleBand();                                            
      Page1.ReportTitle.Name = "ReportTitle1";
      Page1.PaperHeight = ds_Height;
      Page1.PaperWidth = ds_Width;
      
      
      // Размеры страницы (A4)
      float pageHeight = Units.Millimeters * ds_Height;
      float pageWidth = Units.Millimeters * ds_Width;
      ShapeObject shape1 = new ShapeObject();
                                                                                            
      
      // Создаем фигуру для заливки заднего фона
      shape1.Width = pageWidth;
      shape1.Height = pageHeight;
      
      // Переводим цвет из HEX
      Color beigeColor = ColorTranslator.FromHtml(((String)Report.GetColumnValue("JSON1.item.backgroundColor")));
      shape1.FillColor = beigeColor;
      Page1.ReportTitle.Objects.Add(shape1);
      
      
      
      // Вычисляем размеры ячейки
      float cellWidth = pageWidth  / columns;
      float cellHeight = pageHeight / rows;
      
      //Паттерны расположения
      string pattern = ((String)Report.GetColumnValue("JSON1.item.pattern"));  // "cyclic"  "row"  "column"  "diagonal"  "anti-diagonal"
      // Добавляем изображения в ячейки
      for (int row = 0; row < rows; row++)
      { 
        for (int col = 0; col < columns; col++)
        {
          // Выбираем изображение, используя индекс с циклом (для повторения)
          string imageLocation;
          switch (pattern)
          {
            case "cyclic":
              // Циклический паттерн: изображения повторяются по порядку
              imageLocation = imageLocationsList[(row * columns + col) % imageLocationsList.Count];
              break;

            case "row":
              // Один и тот же набор изображений на каждой строке
              imageLocation = imageLocationsList[row % imageLocationsList.Count];
              break;

            case "column":
              // Один и тот же набор изображений на каждом столбце
              imageLocation = imageLocationsList[col % imageLocationsList.Count];
              break;

            case "diagonal":
              // Диагональный паттерн: для каждой диагонали используется одно изображение
              imageLocation = imageLocationsList[(row + col) % imageLocationsList.Count];
              break;
            case "anti-diagonal":
              imageLocation = imageLocationsList[(col + row + 1) % imageLocationsList.Count];
              break;
            default:
              // По умолчанию циклический паттерн
              imageLocation = imageLocationsList[(row * columns + col) % imageLocationsList.Count];
              break;
          }
          
          // Создаем PictureObject
          PictureObject picture = new PictureObject();
          
          
          
          

    
          // Преобразование base64 в Image
          try 
          {
            if (!string.IsNullOrEmpty(imageLocation))
            {
              // Удаляем префикс data:image/..., если он есть
              if (imageLocation.Contains(","))
              {
                imageLocation = imageLocation.Split(',')[1];
              }
        
              byte[] imageBytes = Convert.FromBase64String(imageLocation);
              using (var ms = new MemoryStream(imageBytes))
              {
                using (var tempImage = Image.FromStream(ms))
                {
                  picture.Image = new Bitmap(tempImage);
                }
              }
            }
            else
            {
              picture.ShowErrorImage = true;
            }
          }
          catch (Exception ex)
          {
            picture.ShowErrorImage = true;
          }
          picture.Left = cellWidth * col;
          picture.Top = cellHeight * row;
          picture.Width = cellWidth;
          picture.Height = cellHeight;
          picture.SizeMode = PictureBoxSizeMode.StretchImage;
          picture.Padding = new Padding(((Int32)Report.GetColumnValue("JSON1.item.padding")));
          //picture.Angle = 270;
          
          
          // Добавляем изображение в ReportTitleBand
          Page1.ReportTitle.Objects.Add(picture);
        }
      }      
      
      
      
      
      
      
   

      }
  }
}            
