using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;
using Newtonsoft.Json;

namespace WebKred
{
    public partial class Controller : System.Web.UI.Page
    {
        LinkSpaceBAL linkSpaceBAL = new LinkSpaceBAL();

        protected void Page_Load(object sender, EventArgs e)
        {
            #region Old Code Commented

            Response.AddHeader("Content-type", "text/javascript");

            //string[][] arrReturn = LinkSpace.get2dArray(0, -1);        
            string[][] arrReturn = linkSpaceBAL.get2dArray(0, -1);
            string data = JavaScriptConvert.SerializeObject(arrReturn);
            string ret = "{data:" + data + ",\n";
            ret += "recordType : 'array'}";
            Response.Write(ret);
            Response.End();

            #endregion
            /*
        Response.AddHeader("Content-type", "text/javascript");

        if (Request.Params["p"].Equals("save"))
        {
            Response.AddHeader("Content-type", "text/javascript");
            string lstr = Request.Params["_gt_json"];
            //string lstr = "{action : \"save\",  fieldsName : [\"field1\",\"field2\",\"field3\",\"field4\"],  insertedRecords : [],  updatedRecords : [],  deletedRecords : [],  recordType : \"array\",  parameters : {}}";
            SaveDataInfo<LinkSpaceEntityWrapper> ldi = JavaScriptConvert.DeserializeObject<SaveDataInfo<LinkSpaceEntityWrapper>>(lstr);
            linkSpaceBAL.DeleteLinkSpaces(ldi.deletedRecords);
            linkSpaceBAL.UpdateLinkSpaces(ldi.updatedRecords);
            linkSpaceBAL.InsertLinkSpaces(ldi.insertedRecords);
            Response.Write("{success : true,exception:''}");
        }
        else
        {         
            string lstr = Request.Params["_gt_json"];
            LoadDataInfo ldi = JavaScriptConvert.DeserializeObject<LoadDataInfo>(lstr);
            LinkSpaceEntity[] arrReturn = linkSpaceBAL.getLinkSpaceArray(ldi.pageInfo.PageNum, ldi.pageInfo.PageSize);
            Int32 count = linkSpaceBAL.getLinkSpaceCount();
            string data = JavaScriptConvert.SerializeObject(arrReturn);
            string ret = "{data:" + data + ",\n";
            ret += "pageInfo:{totalRowNum:" + count + "},\n";
            ret += "recordType : 'array'}";
            Response.Write(ret);
        }

        Response.End();
        */
        }
    }
}