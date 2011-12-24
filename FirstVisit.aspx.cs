using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebKred
{
    public partial class FirstVisit : System.Web.UI.Page
    {
        #region Variables

        int companyId;

        #endregion

        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["UserName"] == null)
            {
                Response.Redirect("~/Login.aspx");
            }

            if (Session["CompanyId"] != null && Session["CompanyId"].ToString() != "")
            {
                companyId = Convert.ToInt32(Session["CompanyId"]);
            }

            if (!Page.IsPostBack)
            {
                ShowHideFirstVisitVideo();
            }
        }

        #endregion

        #region Methods

        private void ShowHideFirstVisitVideo()
        {
            ProjectBAL projectBAL = new ProjectBAL();
            projectBAL.CompanyId = companyId;
            bool isProjectExist = projectBAL.IsAnyProjectExistForThisCompany();

            if (isProjectExist)
            {
                divFirstVisitVideo.Visible = false;
            }
            else
            {
                divFirstVisitVideo.Visible = true;
            }
        }

        #endregion
    }
}