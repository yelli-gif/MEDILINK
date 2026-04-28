package com.medilink.lot4.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientDTO {

    private String id;
    private String nom;
    private String prenom;
    private String groupeSanguin;

    // On utilise une liste de Strings pour que Jackson
    // le transforme automatiquement en tableau JSON [ ]
    private List<String> antecedents;
}