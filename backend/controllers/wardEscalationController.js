import pool from "../config/db.js";

async function wardEscalationController(issueId, lng, lat){
    try{
        const wardDetailsText = "SELECT w.ward_name, z.zone_name, z.officer_designation, " + 
        "z.office_email FROM bengaluru_wards w JOIN zone_contacts z ON w.zone_id = z.zone_id " +
        "WHERE ST_Contains(w.geom, ST_SetSRID(ST_MakePoint($1, $2), 4326))";

        const response = await pool.query(wardDetailsText, [lng, lat]);
        const contactDetails = response.rows[0];

        console.log(response.rows);
    }
    catch(err){
        console.log(err.message);
    }
}

export default wardEscalationController;