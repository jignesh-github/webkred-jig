using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using System.IO;
using System.Web.Services;
using System.Text;
using System.Data.SqlClient;

namespace WebKred
{
    public partial class AddActor : System.Web.UI.Page
    {
        #region Variables

        DataTable dataTable = new DataTable();
        ActorBAL actorBAL = new ActorBAL();

        #endregion Variables

        #region Properties

        public string Direction
        {
            get { return (string)(ViewState["SortDirection"] ?? "ASC"); }
            set { ViewState["SortDirection"] = value; }
        }

        #endregion Properties

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Session["UserName"] == null || Session["UserName"].ToString() == "")
                {
                    Response.Redirect("~/Login.aspx");
                }

                Session["CheckRefresh"] = Server.UrlDecode(System.DateTime.Now.ToString());

                litErrorMsg.Text = "";
                getActor();
            }
        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            if (Session["CheckRefresh"].ToString() == ViewState["CheckRefresh"].ToString())
            {
                actorBAL.Bio = txtBIO.Value;
                actorBAL.BirthDate = Convert.ToDateTime(txtDOB.Value);
                actorBAL.Email = txtEmailID.Value;
                actorBAL.FirstName = txtFirstName.Value;
                actorBAL.LastName = txtLastName.Value;
                actorBAL.Other = "";
                actorBAL.ProjectId = 1;
                actorBAL.IsActive = true;

                try
                {
                    if (fuAttchment.HasFile)
                    {
                        actorBAL.ActorDocument = fuAttchment.FileName;
                    }
                    else
                    {
                        actorBAL.ActorDocument = "";
                    }

                    int actorId = actorBAL.ActorInsert();

                    if (fuAttchment.HasFile)
                    {
                        fuAttchment.SaveAs(Server.MapPath("~/ActorDocuments/") + actorId.ToString() + "_" + fuAttchment.FileName);
                    }

                }
                catch (Exception ex)
                {
                    litErrorMsg.Text = "Adding Actor Fails !  " + ex.Message;
                }

                getActor();
                setDefaultValue();

                Session["CheckRefresh"] = Server.UrlDecode(System.DateTime.Now.ToString());
            }
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            ViewState["CheckRefresh"] = Session["CheckRefresh"];
        }

        protected void gvActor_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            try
            {
                gvActor.PageIndex = e.NewPageIndex;
                dataTable = (DataTable)ViewState["dtActor"];
                gvActor.DataSource = dataTable;
                gvActor.DataBind();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected void gvActor_RowCreated(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow && e.Row.RowType != DataControlRowType.Pager)
            {

                e.Row.Attributes.Add("onmouseover", "this.style.backgroundColor='#0082B0';");
                e.Row.Attributes.Add("onmouseout", "this.style.backgroundColor='#e1e8ee';");
                int id = Convert.ToInt32(gvActor.DataKeys[e.Row.RowIndex].Value);
                //e.Row.Attributes.Add("onclick", "javascript:GetEditActor('" + id.ToString() + "');");
                e.Row.Cells[1].Attributes.Add("onclick", "javascript:GetEditActor('" + id.ToString() + "');");
                e.Row.Cells[2].Attributes.Add("onclick", "javascript:GetEditActor('" + id.ToString() + "');");
                e.Row.Cells[3].Attributes.Add("onclick", "javascript:GetEditActor('" + id.ToString() + "');");
                e.Row.Cells[4].Attributes.Add("onclick", "javascript:GetEditActor('" + id.ToString() + "');");
                e.Row.Cells[5].Attributes.Add("onclick", "javascript:GetEditActor('" + id.ToString() + "');");
                e.Row.Cells[6].Attributes.Add("onclick", "javascript:GetEditActor('" + id.ToString() + "');");
                e.Row.Cells[7].Attributes.Add("onclick", "javascript:GetEditActor('" + id.ToString() + "');");
            }
        }

        protected void gvActor_RowDataBound(object sender, GridViewRowEventArgs e)
        {
            if (e.Row.RowType == DataControlRowType.DataRow)
            {
                int id = Convert.ToInt32(gvActor.DataKeys[e.Row.RowIndex].Value);
                CheckBox chk = (CheckBox)e.Row.FindControl("chkIsActive");
                chk.Attributes.Add("onclick", "javascript:CheckUnCheck('" + id.ToString() + "','" + chk.ClientID + "');");
            }
        }

        protected void gvActor_Sorting(object sender, GridViewSortEventArgs e)
        {
            dataTable = (DataTable)ViewState["dtActor"];
            if (dataTable != null)
            {
                DataView dv = new DataView(dataTable);
                dv.Sort = string.Format("{0} {1}", e.SortExpression, Direction);
                Direction = (Direction == "ASC") ? "DESC" : "ASC";

                gvActor.DataSource = dv;
                gvActor.DataBind();
            }
        }

        protected void btnSaveInfo_Click(object sender, EventArgs e)
        {
            try
            {
                actorBAL.ActorId = Convert.ToInt32(hdnEditActorId.Value);
                actorBAL.FirstName = txtFirstNameEditInfo.Text;
                actorBAL.LastName = txtLastNameEditInfo.Text;
                actorBAL.BirthDate = Convert.ToDateTime(txtBirthDayEditInfo.Text);
                actorBAL.Email = txtEmailEditInfo.Text;
                actorBAL.Bio = txtBIOEditInfo.Text;
                actorBAL.Other = txtOtherEditInfo.Text;
                actorBAL.ActorDocument = hdnWaverFile.Value.ToString();

                if (fupWaverFileEditInfo.HasFile)
                {
                    actorBAL.ActorDocument = fupWaverFileEditInfo.FileName;
                    string mimeType = fupWaverFileEditInfo.PostedFile.ContentType;

                    if (File.Exists(Server.MapPath("~/ActorDocuments/" + actorBAL.ActorId.ToString() + "_" + hdnWaverFile.Value.ToString())))
                    {
                        File.Delete(Server.MapPath("~/ActorDocuments/" + actorBAL.ActorId.ToString() + "_" + hdnWaverFile.Value.ToString()));
                    }

                    fupWaverFileEditInfo.SaveAs(Server.MapPath("~/ActorDocuments/") + actorBAL.ActorId.ToString() + "_" + fupWaverFileEditInfo.FileName);
                }
                else
                {
                    actorBAL.ActorDocument = hdnWaverFile.Value.ToString();
                }

                int result = actorBAL.ActorInsert();
                actorBAL.ActorId = actorBAL.ActorId = 0;
                getActor();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected void lnkExportExcel_Click(object sender, EventArgs e)
        {
            DataTable dt = (DataTable)ViewState["dtActor"];

            if (dt.Rows.Count > 0)
            {
                string attachment = "attachment; filename=ActorData.xls";
                Response.ClearContent();
                Response.AddHeader("content-disposition", attachment);
                Response.ContentType = "application/vnd.ms-excel";
                string tab = "";

                foreach (DataColumn dc in dt.Columns)
                {
                    if (dc.ColumnName != "ProjectId")
                    {
                        Response.Write(tab + dc.ColumnName);
                        tab = "\t";
                    }
                }
                Response.Write("\n");

                int i;
                foreach (DataRow dr in dt.Rows)
                {
                    tab = "";
                    for (i = 0; i < dt.Columns.Count; i++)
                    {
                        if (dt.Columns[i].ColumnName != "ProjectId")
                        {
                            Response.Write(tab + dr[i].ToString());
                            tab = "\t";
                        }
                    }
                    Response.Write("\n");
                }
                Response.End();
            }
        }

        #endregion Events

        #region Methods

        public void getActor()
        {
            try
            {
                dataTable = actorBAL.ActorSelect();
            }
            catch (Exception ex)
            {
                throw ex;
            }
            if (dataTable.Rows.Count > 0)
            {
                lnkExportExcel.Visible = true;
                ViewState["dtActor"] = dataTable;
                gvActor.DataSource = dataTable;
                gvActor.DataBind();
            }
            else
            {
                lnkExportExcel.Visible = false;
            }
        }

        public void setDefaultValue()
        {
            txtFirstName.Value = "First Name";
            txtLastName.Value = "Last Name";
            txtEmailID.Value = "EMAIL";
            txtDOB.Value = "mm/dd/yyyy";
            txtBIO.Value = "BIO";
        }

        [WebMethod]
        public static string[] GetEditActor(string id)
        {
            ActorBAL sActorBAL = new ActorBAL();
            DataTable sDt = new DataTable();
            string[] strActorData = new string[9];

            try
            {
                sActorBAL.ActorId = Convert.ToInt32(id);
                sDt = sActorBAL.ActorSelect();

                if (sDt.Rows.Count > 0)
                {
                    strActorData[0] = sDt.Rows[0]["FirstName"].ToString();
                    strActorData[1] = sDt.Rows[0]["LastName"].ToString();
                    strActorData[2] = sDt.Rows[0]["Email"].ToString();
                    strActorData[3] = Convert.ToDateTime(sDt.Rows[0]["BirthDate"].ToString()).Date.ToShortDateString();
                    strActorData[4] = sDt.Rows[0]["Age"].ToString();
                    strActorData[5] = sDt.Rows[0]["Bio"].ToString();
                    strActorData[6] = sDt.Rows[0]["ActorDocument"].ToString();
                    strActorData[7] = sDt.Rows[0]["Other"].ToString();
                    strActorData[8] = id;
                }

                return strActorData;
            }
            catch (Exception ex)
            {
                strActorData[0] = ex.Message;
                return strActorData;
            }
        }

        [WebMethod]
        public static string CheckUnCheck(string actorId,string value)
        {
            ActorBAL actorBAL = new ActorBAL();
            actorBAL.ActorId = Convert.ToInt32(actorId);
            actorBAL.IsActive = Convert.ToBoolean(value);

            try
            {
                actorBAL.ActorActiveInActive();
                return "0";
            }
            catch (SqlException ex)
            {
                return ex.Message;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static void setActor()
        {

        }

        public static string Limit(object bio, int length)
        {
            StringBuilder strDesc = new StringBuilder();
            strDesc.Insert(0, bio.ToString());

            if (strDesc.Length > length)
            {
                return strDesc.ToString().Substring(0, length) + "...";
            }
            else
            {
                return strDesc.ToString();
            }
        }

        #endregion Methods        
    }
}