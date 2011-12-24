using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Webkred;
using Newtonsoft.Json;
using System.Data;
using System.IO;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using System.Data.SqlClient;

namespace WebKred
{
    public partial class LinkSpaceCRUDController : System.Web.UI.Page
    {
        LinkSpaceBAL linkSpaceBAL = new LinkSpaceBAL();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["UserName"] == null && Session["UserName"].ToString() == "")
            {
                Response.Redirect("~/Login.aspx");
            }

            if (Session["ProjectId"] != null && Session["ProjectId"].ToString() != "")
            {
                linkSpaceBAL.ProjectId = Convert.ToInt32(Session["ProjectId"]);
            }

            Response.AddHeader("Content-type", "text/javascript");

            if (Request.Params["p"].Equals("save"))
            {
                string lstr = Request.Params["_gt_json"];

                SaveDataInfo<LinkSpaceEntityWrapper> ldi = JavaScriptConvert.DeserializeObject<SaveDataInfo<LinkSpaceEntityWrapper>>(lstr);

                try
                {
                    if (ldi.deletedRecords.Count() > 0)
                    {
                        linkSpaceBAL.DeleteLinkSpaces(ldi.deletedRecords);
                    }
                    else if (ldi.updatedRecords.Count() > 0)
                    {
                        linkSpaceBAL.UpdateLinkSpaces(ldi.updatedRecords);
                    }

                    else if (ldi.insertedRecords.Count() > 0)
                    {
                        linkSpaceBAL.InsertLinkSpaces(ldi.insertedRecords);
                    }
                }
                catch (SqlException ex)
                {
                    Response.Write(ex.Message);
                }

                Response.Write("{success : true,exception:''}");
            }
            else if (Request.Params["p"].Equals("load"))
            {
                LinkSpaceEntity[] arrReturn = null;
                int count = 0;
                string lstr = Request.Params["_gt_json"];
                LoadDataInfo ldi = JavaScriptConvert.DeserializeObject<LoadDataInfo>(lstr);

                try
                {
                    arrReturn = linkSpaceBAL.getLinkSpaceArray(ldi.pageInfo.PageNum, ldi.pageInfo.PageSize, linkSpaceBAL.ProjectId);
                    count = linkSpaceBAL.getLinkSpaceCount();
                }
                catch (SqlException ex)
                {
                    Response.Write(ex.Message);
                }

                string data = JavaScriptConvert.SerializeObject(arrReturn);
                string ret = "{data:" + data + ",\n";
                ret += "pageInfo:{totalRowNum:" + count + "},\n";
                ret += "recordType : 'object'}";
                Response.Write(ret);
            }
            else if (Request.Params["p"].Equals("xls") || Request.Params["p"].Equals("csv"))
            {
                string tab;
                string csvFormate = string.Empty;
                string attachment;
                string columnName;
                string rowData;
                string lstr = Request.Params["_gt_json"];
                SaveDataInfo<LinkSpaceEntityWrapper> ldi = JavaScriptConvert.DeserializeObject<SaveDataInfo<LinkSpaceEntityWrapper>>(lstr);

                if (ldi.selectedRecords.Count() > 0)
                {
                    if (Request.Params["p"].Equals("xls"))
                    {
                        attachment = "attachment; filename=LinkSpace.xls";
                        tab = "\t";
                    }
                    else
                    {
                        attachment = "attachment; filename=LinkSpace.csv";
                        tab = "\",\"";
                        csvFormate = "\"";
                    }

                    Response.ClearContent();
                    Response.AddHeader("content-disposition", attachment);
                    Response.ContentType = "application/vnd.ms-excel";

                    columnName = csvFormate + "Forum URL" + tab + "Forum Content" + tab + "Actor Name" + tab + "User Name" + tab + "Password" + tab + "Reply Content" + tab + "Reply URL" + csvFormate;
                    Response.Write(columnName);
                    Response.Write("\n");

                    foreach (LinkSpaceEntityWrapper lew in ldi.selectedRecords)
                    {
                        rowData = csvFormate + lew.ForumURL + tab + lew.ForumContent + tab + lew.ActorName.Substring(0, lew.ActorName.LastIndexOf(',')) + tab + lew.UserName + tab + lew.Password + tab + lew.ReplyContent + tab + lew.ReplyURL + csvFormate;
                        rowData = rowData.Replace("\n", " ").Replace("\n\r", " ");
                        Response.Write(rowData + "\n");
                    }
                }
            }
            else if (Request.Params["p"].Equals("pdf"))
            {
                string lstr = Request.Params["_gt_json"];
                SaveDataInfo<LinkSpaceEntityWrapper> ldi = JavaScriptConvert.DeserializeObject<SaveDataInfo<LinkSpaceEntityWrapper>>(lstr);

                if (ldi.selectedRecords.Count() > 0)
                {
                    DataTable dt = new DataTable("LinkSpace");
                    dt.Columns.Add("ForumURL", Type.GetType("System.String"));
                    dt.Columns.Add("ForumContent", Type.GetType("System.String"));
                    dt.Columns.Add("ActorName", Type.GetType("System.String"));
                    dt.Columns.Add("UserName", Type.GetType("System.String"));
                    dt.Columns.Add("Password", Type.GetType("System.String"));
                    dt.Columns.Add("ReplyContent", Type.GetType("System.String"));
                    dt.Columns.Add("ReplyURL", Type.GetType("System.String"));

                    DataRow dr;

                    foreach (LinkSpaceEntityWrapper lew in ldi.selectedRecords)
                    {
                        dr = dt.NewRow();
                        dr["ForumURL"] = lew.ForumURL;
                        dr["ForumContent"] = lew.ForumContent;
                        dr["ActorName"] = lew.ActorName.Substring(0, lew.ActorName.LastIndexOf(','));
                        dr["UserName"] = lew.UserName;
                        dr["Password"] = lew.Password;
                        dr["ReplyContent"] = lew.ReplyContent;
                        dr["ReplyURL"] = lew.ReplyURL;
                        dt.Rows.Add(dr);
                    }

                    ExportToPDF(dt);
                }
            }
            else
            {
                Response.Write("Not Define");
            }

            Response.End();
        }

        protected void ExportToPDF(DataTable dt)
        {            
            GridView gvExport = new GridView();
            gvExport.AllowPaging = false;
            gvExport.DataSource = dt;
            gvExport.DataBind();

            gvExport.HeaderRow.Style.Add("font-size", "10px");
            gvExport.HeaderRow.Style.Add("font-weight", "bold");
            gvExport.Style.Add("text-decoration", "none");
            gvExport.Style.Add("font-family", "Arial, Helvetica, sans-serif;");
            gvExport.Style.Add("font-size", "8px");

            Response.ContentType = "application/pdf";
            Response.AddHeader("content-disposition", "attachment;filename=LinkSpace.pdf");

            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            StringWriter sw = new StringWriter();
            HtmlTextWriter hw = new HtmlTextWriter(sw);

            gvExport.RenderControl(hw);

            StringReader sr = new StringReader(sw.ToString());
            Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
            HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
            PdfWriter.GetInstance(pdfDoc, Response.OutputStream);

            pdfDoc.Open();
            htmlparser.Parse(sr);
            pdfDoc.Close();
            Response.Write(pdfDoc);
            Response.End();
        }
    }
}