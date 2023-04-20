package com.inventory.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.inventory.entities.Employee;
import com.inventory.entities.Roles;
import com.inventory.repositories.RolesRepository;
import com.inventory.repositories.UserRepository;

@RestController
public class UserController {

	@Autowired
	UserRepository userRepository;

	@Autowired
	RolesRepository rolesRepository;

	@GetMapping(path = "/user")
	public List<Employee> getAllUser(){
		return userRepository.findAll();
	}

	@PostMapping(path = "/user")
	public String addUser(@RequestBody Employee u) {

		System.out.println(u);
		if(u.getRole().getName().length() > 0) {
			Optional<Roles> roleFound = rolesRepository.findByName(u.getRole().getName());
			System.out.println(roleFound);
			if(roleFound.isPresent()) {
				u.setRole(roleFound.get());
				userRepository.save(u);
			}

			else {
				return "Wrong role. No roles found";
			}
		}

		return "";
	}

	@GetMapping(path = "/user/{id}")
	public Optional<Employee> getUserById(@PathVariable long id, @RequestBody Employee u) {
		return userRepository.findById(id);
	}

//	@GetMapping("/user")
//	ResponseEntity<?> getEmployee(@PathVariable String userName) {
//		Employee e = userRepository.findByUserName(userName);
//		System.out.println(userName);
//		if (e != null) {
//            return ResponseEntity.ok(e);
//        } else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//        }
//	}

	@PostMapping("/validate")
	ResponseEntity<?> getEmployee(@RequestBody Employee e) {
		Optional<Employee> employeeFound = userRepository.findByUserName(e.getUserName());
		if (employeeFound.isPresent() && employeeFound.get().getPassword().equals(e.getPassword())) {
			e = employeeFound.get();
            return ResponseEntity.ok(e);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
	}

}
