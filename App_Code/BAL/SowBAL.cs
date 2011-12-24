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
    public class SowBAL
    {
        #region Variables

        SowDAL sowDAL = new SowDAL();
        DataTable dt = new DataTable();
        int result = 0;

        #endregion Variables

        #region Properties

        int sowId = 0;
        public int SowId
        {
            get { return sowId; }
            set { sowId = value; }
        }

        string sowText = "";
        public string SowText
        {
            get { return sowText; }
            set { sowText = value; }
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
                dt = sowDAL.SowSelect(this);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int SowInsert()
        {
            try
            {
                result = sowDAL.SowInsert(this);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion Method
    }
}