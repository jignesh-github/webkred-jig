using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;

namespace WebKred
{
    public class ProjectDAL
    {
        #region Variabels

        SqlCommand cmd;
        SqlDataAdapter sda;
        SqlConnection con;
        DataTable dt = new DataTable();

        #endregion

        #region Methods

        public DataTable ProjectSelect(ProjectBAL projectBAL)
        {
            con = Connection.GetConnection();
            cmd = Connection.GetCommand("ProjectSelect", con);
            cmd.Parameters.AddWithValue("@CompanyId", projectBAL.CompanyId);
            sda = new SqlDataAdapter(cmd);

            try
            {
                sda.Fill(dt);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return dt;
        }

        public void SowTextUpdate(ProjectBAL projectBAL)
        {
            try
            {
                con = Connection.GetConnection();
                cmd = Connection.GetCommand("SowTextUpdate", con);
                con.Open();

                cmd.Parameters.AddWithValue("@ProjectId", projectBAL.ProjectId);
                cmd.Parameters.AddWithValue("@SowText", projectBAL.SowText);
                cmd.ExecuteNonQuery();

                con.Close();
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

        #endregion Methods
    }
}