using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebKred
{
    public partial class MasterLinkSpace : System.Web.UI.MasterPage
    {
        #region Events

        protected void Page_Load(object sender, EventArgs e)
        {
            if (Session["UserName"] != null && Session["UserName"].ToString() != "")
            {
                litUserName.Text = Session["UserName"].ToString();
                litClientUserName.Text = Session["UserName"].ToString();

                ShowHideMenuTabAsPerUserRole();
            }
            else
            {
                Response.Redirect("~/Login.aspx");
            }
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

        #endregion

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
                }
                else if (roleName == "Marketer")
                {
                    hlAddActor.Visible = false;
                    hlAllPeople.Visible = false;
                    hlAccount.Visible = false;
                }
            }
        }

        #endregion
    }
}