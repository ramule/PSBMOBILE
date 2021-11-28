package com.cordova.SDCP;
import android.app.Activity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AlertDialog;

// UAT
// import com.infrasofttech.psb.R;

// PROD
import com.psb.omniretail.R;


public class SCDA extends Activity {
//SimChangeDialogActivity

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sim_change_dialog);
        // Utilities.secureApp(this);
        final AlertDialog.Builder builder = new AlertDialog.Builder(this, R.style.AlertDialogTheme);
        builder.setCancelable(false);
        builder.setMessage("It seems Sim card is removed. Kindly retry after putting sim card.");
        builder.setPositiveButton("Ok", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                callIntent(SCDA.this);
            }
        });
        builder.show();
    }

    private void callIntent(Context context) {
//             Intent intent = new Intent(context, SA.class);
//             intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_CLEAR_TASK | Intent.FLAG_ACTIVITY_NEW_TASK);
//             context.startActivity(intent);
      finish();
      android.os.Process.killProcess(android.os.Process.myPid());
    }

}
