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
    public class SowDAL
    {

        #region Variables

        SqlCommand cmd;
        SqlDataAdapter sda;
        DataTable dt;
        SqlConnection con;

        #endregion Variables

        #region Constructor

        public SowDAL()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        #endregion Constructor

        #region Method

        public DataTable SowSelect(SowBAL sowBAL)
        {
            try
            {
                dt = new DataTable();
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("SowSelect", con);
                cmd.Parameters.AddWithValue("@ProjectId", sowBAL.SowId);
                sda = new SqlDataAdapter(cmd);
                sda.Fill(dt);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int SowInsert(SowBAL sowBAL)
        {
            try
            {
                con = Connection.GetConnection();
                con.BeginTransaction();

                cmd = Connection.GetCommand("SowInsert", con);
                con.Open();

                cmd.Parameters.AddWithValue("@SowId", sowBAL.SowId);
                cmd.Parameters.AddWithValue("@ProjectId", sowBAL.ProjectId);
                cmd.Parameters.AddWithValue("@SowText", sowBAL.SowText);

                cmd.Parameters.AddWithValue("@SowId", sowBAL.SowId);
                cmd.Parameters["@SowId"].Direction = ParameterDirection.InputOutput;

                cmd.ExecuteNonQuery();
                int SowId = Convert.ToInt32(cmd.Parameters["@SowId"].Value);
                con.Close();

                return SowId;


            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (con.State != ConnectionState.Closed)
                    con.Close();
            }
        }

        #endregion Method
    }
}