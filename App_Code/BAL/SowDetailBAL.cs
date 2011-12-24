using System;
using System.Data;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

namespace WebKred
{
    public class SowDetailBAL
    {
        #region Variables

        SowDetailDAL sowDetailDAL = new SowDetailDAL();
        DataTable dt = new DataTable();
        int result = 0;

        #endregion Variables

        #region Properties

        int sowDetailId = 0;
        public int SowDetailId
        {
            get { return sowDetailId; }
            set { sowDetailId = value; }
        }

        string sowDocument = "";
        public string SowDocument
        {
            get { return sowDocument; }
            set { sowDocument = value; }
        }

        int projectId = 0;
        public int ProjectId
        {
            get { return projectId; }
            set { projectId = value; }
        }

        #endregion Properties

        #region Method

        public DataTable SowDetailSelect()
        {
            try
            {
                dt = sowDetailDAL.SowDetailSelect(this);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int SowDetailInsert()
        {
            try
            {
                result = sowDetailDAL.SowDetailInsert(this);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void SowDetailDelete()
        {
            try
            {
                sowDetailDAL.SowDetailDelete(this);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion Method
    }
}