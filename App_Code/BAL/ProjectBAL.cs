using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;

namespace WebKred
{
    public class ProjectBAL
    {
        #region Variables

        ProjectDAL projectDAL = new ProjectDAL();
        DataTable dt = new DataTable();

        #endregion

        #region Properties

        int projectId = 0;
        public int ProjectId
        {
            get { return projectId; }
            set { projectId = value; }
        }

        string projectName;
        public string ProjectName
        {
            get { return projectName; }
            set { projectName = value; }
        }

        int companyId;
        public int CompanyId
        {
            get { return companyId; }
            set { companyId = value; }
        }

        string sowText;
        public string SowText
        {
            get { return sowText; }
            set { sowText = value; }
        }

        #endregion

        #region Methods

        public bool IsAnyProjectExistForThisCompany()
        {
            return projectDAL.ProjectSelect(this).Rows.Count > 0 ? true : false;
        }
        public void SowTextUpdate()
        {
            projectDAL.SowTextUpdate(this);
        }

        #endregion
    }
}