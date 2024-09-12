package com.HiVisit.app.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
     String name;
     String lastName;
     String phone;
     String dni;
     String password;
     List<Visit> visits;
}
