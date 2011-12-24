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
using System.Data.SqlClient;

namespace WebKred
{
    public static class Connection
    {
        #region Variables

        static string conString = "";
        static SqlCommand cmd;
        static SqlConnection con;

        #endregion

        #region Constructor

        static Connection()
        {
            conString = ConfigurationManager.ConnectionStrings["WebKredConnectionString"].ConnectionString;
        }

        #endregion Constructor

        #region Methods

        public static SqlConnection GetConnection()
        {
            try
            {
                con = new SqlConnection(conString);
                return con;
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        public static SqlCommand GetCommand(string commandText, SqlConnection conn)
        {
            try
            {
                cmd = conn.CreateCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = commandText;
                return cmd;
            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }

        #endregion Methods
    }
}