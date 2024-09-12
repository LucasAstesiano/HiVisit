package com.HiVisit.app.repository;

import com.HiVisit.app.model.Visit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VisitRepository extends MongoRepository<Visit,String> {
}
