using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Data;
using System.IO;
using System.Web.UI.HtmlControls;

namespace WebKred
{
    public partial class LinkSpaceCRUD : System.Web.UI.Page
    {
        #region Variables

        SowDetailBAL sowDetailBAL = new SowDetailBAL();
        ProjectBAL projectBAL = new ProjectBAL();
        DataTable dt = new DataTable();

        #endregion Variables

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["UserName"] != null && Session["UserName"].ToString() != "")
            {
                litUserName.Text = Session["UserName"].ToString();
                litClientUserName.Text = Session["UserName"].ToString();
                litProjectName.Text = Session["ProjectName"].ToString();

                ShowHideMenuTabAsPerUserRole();
            }
            else
            {
                Response.Redirect("~/Login.aspx");
            }

            if (!IsPostBack)
            {
                Session["CheckRefresh"] = Server.UrlDecode(System.DateTime.Now.ToString());
                FillAttachedDocuments(Convert.ToInt32(Session["ProjectId"]));
            }

            CreateActorListForFillingDropDownList();
        }

        protected void lnkLogout_Click(object sender, EventArgs e)
        {
            Session["UserName"] = null;
            Session["UserId"] = null;
            Session["CompanyId"] = null;
            Session["ProjectId"] = null;
            Session["ProjectName"] = null;
            Session["RoleName"] = null;

            Response.Redirect("~/Login.aspx");
        }

        protected void btnUpload_Click(object sender, EventArgs e)
        {
            if (Session["CheckRefresh"].ToString() == ViewState["CheckRefresh"].ToString())
            {
                if (fupSOWDoc.HasFile)
                {
                    sowDetailBAL.SowDocument = fupSOWDoc.FileName;
                    sowDetailBAL.ProjectId = Convert.ToInt32(Session["ProjectId"]);
                    int sowDetailId = sowDetailBAL.SowDetailInsert();

                    if (sowDetailId > 0)
                    {
                        if (File.Exists("SowDocuments/" + sowDetailId + "_" + sowDetailBAL.SowDocument))
                        {
                            File.Delete("SowDocuments/" + sowDetailId + "_" + sowDetailBAL.SowDocument);
                        }

                        fupSOWDoc.SaveAs(Server.MapPath("~/SowDocuments/") + sowDetailId + "_" + sowDetailBAL.SowDocument);
                        FillAttachedDocuments(Convert.ToInt32(Session["ProjectId"]));
                    }
                }

                divSOW.Style.Add("display", "inline");
                Session["CheckRefresh"] = Server.UrlDecode(System.DateTime.Now.ToString());
                FillAttachedDocuments(Convert.ToInt32(Session["ProjectId"]));
            }
        }

        protected void btnSOWSave_Click(object sender, EventArgs e)
        {
            try
            {
                projectBAL.ProjectId = Convert.ToInt32(Session["ProjectId"]);
                projectBAL.SowText = txtSOWDescription.Text.Trim();

                projectBAL.SowTextUpdate();

                FillAttachedDocuments(Convert.ToInt32(Session["ProjectId"]));
                divSOW.Style.Add("display", "inline");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected void Page_PreRender(object sender, EventArgs e)
        {
            ViewState["CheckRefresh"] = Session["CheckRefresh"];
        }

        //protected void btnDel_Command(object sender, CommandEventArgs e)
        //{
        //    string[] arguments = ((string)e.CommandArgument).Split(new char[] { '*' });
        //    if (arguments != null && arguments[0].ToString() != "")
        //    {
        //        SowDetailBAL sowDetailBAL = new SowDetailBAL();

        //        try
        //        {
        //            sowDetailBAL.SowDetailId = Convert.ToInt32(arguments[1]);
        //            sowDetailBAL.SowDetailDelete();
        //            sowDetailBAL.SowDocument = arguments[0];

        //            if (File.Exists(Server.MapPath("~/SowDocuments/" + sowDetailBAL.SowDetailId + "_" + sowDetailBAL.SowDocument)))
        //            {
        //                File.Delete(Server.MapPath("~/SowDocuments/" + sowDetailBAL.SowDetailId + "_" + sowDetailBAL.SowDocument));
        //            }
        //            FillAttachedDocuments(Convert.ToInt32(Session["ProjectId"]));
        //        }
        //        catch (Exception ex)
        //        {
        //            throw ex;
        //        }
        //    }
        //}

        #endregion Events

        #region Methods

        private void ShowHideMenuTabAsPerUserRole()
        {
            if (Session["RoleName"] != null && Session["RoleName"].ToString() != "")
            {
                string roleName = Session["RoleName"].ToString();

                if (roleName == "ProjectManager")
                {
                    hlAllPeople.Visible = false;
                    hlAccount.Visible = false;
                    divFupSowDoc.Style.Add("display", "inline-block");
                    divSOWEdit.Style.Add("display", "inline-block");
                }
                else if (roleName == "Marketer")
                {
                    hlAddActor.Visible = false;
                    hlAllPeople.Visible = false;
                    hlAccount.Visible = false;
                    divFupSowDoc.Style.Add("display", "none");
                    divSOWEdit.Style.Add("display", "none");
                }
            }
        }

        public void CreateActorListForFillingDropDownList()
        {
            string actorListJson = "";
            ActorBAL actorBAL = new ActorBAL();

            DataTable dt = actorBAL.ActorSelectForDropDown();
            foreach (DataRow dr in dt.Rows)
            {
                actorListJson += "'" + dr["ActorName"].ToString() + "," + dr["ActorId"].ToString() + "':" + "'" + dr["ActorName"].ToString() + "," + dr["ActorId"].ToString() + "',";
            }
            actorListJson = actorListJson.TrimEnd(',');

            string addActorJsFunction = "<script type=\"text/javascript\" language=\"javascript\"> " +

            " function getActorList() " +
            " { " +
                //" return { '1': 'Samrat - Arya', '2': 'Vedant - Sharma', '3': 'Eklavya - Varma' }; " +
                " return { " + actorListJson + " }; " +
            " } " +

            " </script>";

            Response.Write(addActorJsFunction);
        }

        [WebMethod]
        public static string[] GetActor(string id)
        {
            ActorBAL ActorBAL = new ActorBAL();
            DataTable dt = new DataTable();
            string[] strActorData = new string[9];

            try
            {
                ActorBAL.ActorId = Convert.ToInt32(id);
                dt = ActorBAL.ActorSelect();

                if (dt.Rows.Count > 0)
                {
                    strActorData[0] = dt.Rows[0]["FirstName"].ToString();
                    strActorData[1] = dt.Rows[0]["LastName"].ToString();
                    strActorData[2] = dt.Rows[0]["Email"].ToString();
                    strActorData[3] = Convert.ToDateTime(dt.Rows[0]["BirthDate"].ToString()).Date.ToShortDateString();
                    strActorData[4] = dt.Rows[0]["Age"].ToString();
                    strActorData[5] = dt.Rows[0]["Bio"].ToString();
                    strActorData[6] = dt.Rows[0]["ActorDocument"].ToString();
                    strActorData[7] = dt.Rows[0]["Other"].ToString();
                    strActorData[8] = Convert.ToInt32(id).ToString();
                }

                return strActorData;
            }
            catch (Exception ex)
            {
                strActorData[0] = ex.Message;
                return strActorData;
            }
        }

        public void FillAttachedDocuments(int projectId)
        {
            string filePath = "";
            sowDetailBAL.ProjectId = projectId;

            try
            {
                dt = sowDetailBAL.SowDetailSelect();
            }
            catch (Exception ex)
            {
                lblEditErrMsg.Text = ex.Message;
            }

            if (dt.Rows.Count > 0)
            {
                divSOWAttachDoc.InnerHtml = "";
                txtSOWDescription.Text = dt.Rows[0]["SowText"].ToString();

                for (int index = 0; index < dt.Rows.Count; index++)
                {
                    if (dt.Rows[0]["SowDetailId"] != DBNull.Value && dt.Rows[0]["SowText"].ToString() != "")
                    {
                        if (Session["RoleName"] != null && Session["RoleName"].ToString() != "")
                        {
                            if (Session["RoleName"].ToString() == "ProjectManager" || Session["RoleName"].ToString() == "Admin")
                            {
                                filePath = Server.MapPath("SowDocuments/" + dt.Rows[index]["SowDetailId"].ToString() + "_" + dt.Rows[index]["SowDocument"].ToString()).Replace("\\", "/");

                                if (File.Exists(filePath))
                                {
                                    File.SetAttributes(filePath, File.GetAttributes(filePath) & ~FileAttributes.ReadOnly);
                                }

                                divSOWAttachDoc.InnerHtml += "<div id=\"mDiv_" + dt.Rows[index]["SowDetailId"].ToString()
                                    + "\" class=\"SowdocHover\" onmouseover=\"document.getElementById('div_"
                                    + dt.Rows[index]["SowDetailId"].ToString() + "').style.display='inline-block';\"onmouseout=\"document.getElementById('div_"
                                    + dt.Rows[index]["SowDetailId"].ToString() + "').style.display='none';\"><a href=\"SowDocuments/"
                                    + dt.Rows[index]["SowDetailId"].ToString() + "_" + dt.Rows[index]["SowDocument"].ToString()
                                    + "\" target=\"_blank\" >"
                                    + dt.Rows[index]["SowDocument"].ToString()
                                    + "</a><div id=\"div_" + dt.Rows[index]["SowDetailId"].ToString()
                                    + "\" style=\"float: right; display: none; *margin:-15px 0px 0px 0px;\"><input id=\""
                                    + dt.Rows[index]["SowDetailId"].ToString()
                                    + "\" type=\"button\" value=\"X\" onclick=\"javascript:DeleteSowDetail(this.id,'"
                                    + filePath + "');\" class=\"btnDelTop\" /></div></div>";

                                fupSOWDoc.Visible = true;
                                btnUpload.Visible = true;

                                #region Comment
                                //HtmlGenericControl div = new HtmlGenericControl("div");
                                //div.ID = "mDiv_" + dt.Rows[index]["SowDetailId"].ToString();
                                //div.Attributes.Add("class", "SowdocHover");

                                //HtmlAnchor aTag = new HtmlAnchor();
                                //aTag.HRef = "SowDocuments/" + dt.Rows[index]["SowDetailId"].ToString() + "_" + dt.Rows[index]["SowDocument"].ToString();
                                //aTag.InnerText = dt.Rows[index]["SowDocument"].ToString();
                                //aTag.Target = "_blank";
                                //div.Controls.Add(aTag);

                                //HtmlGenericControl childDiv = new HtmlGenericControl("div");
                                //childDiv.ID = "div_" + dt.Rows[index]["SowDetailId"].ToString();
                                //childDiv.Attributes.Add("style", "float: right; *margin:-15px 0px 0px 0px;");

                                //Button btnDel = new Button();
                                //btnDel.ID = "btnDelAttchDoc_" + dt.Rows[index]["SowDetailId"].ToString();
                                //btnDel.CssClass = "btnDelTop";
                                //btnDel.CommandArgument = dt.Rows[index]["SowDocument"].ToString() + "*" + dt.Rows[index]["SowDetailId"].ToString();
                                //btnDel.Command += new CommandEventHandler(btnDel_Command);
                                //btnDel.OnClientClick = "DeleteSowDetail('" + dt.Rows[index]["SowDetailId"].ToString() + "')";

                                //childDiv.Controls.Add(btnDel);

                                ////div.Controls.AddAt(1, childDiv);
                                //div.Controls.Add(childDiv);
                                //div.Attributes.Add("onmouseover", "document.getElementById('" + childDiv.ID + "').style.display='inline-block';");
                                //div.Attributes.Add("onmouseout", "document.getElementById('" + childDiv.ID + "').style.display='none';");

                                //divSOWAttachDoc.Controls.Add(div);
                                #endregion
                            }
                            else
                            {
                                divSOWAttachDoc.InnerHtml += "<div id=\"mDiv_" + dt.Rows[index]["SowDetailId"].ToString()
                                    + "\" class=\"SowdocHover\"> <a href=\"SowDocuments/"
                                    + dt.Rows[index]["SowDetailId"].ToString()
                                    + "_" + dt.Rows[index]["SowDocument"].ToString()
                                    + "\" target=\"_blank\" >" + dt.Rows[index]["SowDocument"].ToString()
                                    + "</a></div>";


                                fupSOWDoc.Visible = false;
                                btnUpload.Visible = false;
                                divSOWEdit.Style.Add("display", "none");

                                #region Comment
                                //HtmlGenericControl div = new HtmlGenericControl("div");
                                //div.ID = "mDiv_" + dt.Rows[index]["SowDetailId"].ToString();
                                //div.Attributes.Add("class", "SowdocHover");

                                //HtmlAnchor aTag = new HtmlAnchor();
                                //aTag.HRef = "SowDocuments/" + dt.Rows[index]["SowDetailId"].ToString() + "_" + dt.Rows[index]["SowDocument"].ToString();
                                //aTag.InnerText = dt.Rows[index]["SowDocument"].ToString();
                                //aTag.Target = "_blank";
                                //div.Controls.Add(aTag);

                                //divSOWAttachDoc.Controls.Add(div);
                                #endregion
                            }
                        }
                    }
                }
            }
        }

        [WebMethod]
        public static string DeleteSowDetail(string SowDetailId, string filePath)
        {
            SowDetailBAL sowDetailBAL = new SowDetailBAL();
            try
            {
                sowDetailBAL.SowDetailId = Convert.ToInt32(SowDetailId);
                sowDetailBAL.SowDetailDelete();

                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                }
                return "0";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        #endregion Methods
    }
}