-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: survey_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `defaultquestions`
--

LOCK TABLES `defaultquestions` WRITE;
/*!40000 ALTER TABLE `defaultquestions` DISABLE KEYS */;
INSERT INTO `defaultquestions` VALUES (1,1,'How satisfied are you with the training/course overall?','2026-08-02 08:36:43'),(2,1,'Did the training meet your expectations?','2026-08-02 08:36:43'),(3,1,'How relevant was the course content to your role or goals?','2026-08-02 08:36:43'),(4,1,'Was the material presented clearly and easy to understand?','2026-08-02 08:36:43'),(5,1,'How effective was the trainer in delivering the content?','2026-08-02 08:36:43'),(6,1,'How engaging did you find the sessions?','2026-08-02 08:36:43'),(7,1,'What new skills or knowledge did you gain?','2026-08-02 08:36:43'),(8,1,'How likely are you to apply what you learned in your work?','2026-08-02 08:36:43'),(9,1,'What new skills or knowledge did you gain?','2026-08-02 08:36:43'),(10,1,'How likely are you to apply what you learned in your work?','2026-08-02 08:36:43'),(11,2,'How satisfied are you with our product/service overall?','2026-08-02 09:41:08'),(12,2,'How likely are you to recommend us to a friend or colleague?','2026-08-02 09:41:08'),(13,2,'How would you rate the quality of our product/service?','2026-08-02 09:41:08'),(14,2,'How satisfied are you with the value for money?','2026-08-02 09:41:08'),(15,2,'How easy was it to purchase or access our product/service?','2026-08-02 09:41:08'),(16,2,'How satisfied are you with the delivery/shipping process?','2026-08-02 09:41:08'),(17,2,'How responsive was our customer support team?','2026-08-02 09:41:08'),(18,2,'How well did our product/service meet your expectations?','2026-08-02 09:41:08'),(19,2,'How likely are you to purchase from us again?','2026-08-02 09:41:08'),(20,2,'What can we do to improve your experience?','2026-08-02 09:41:08'),(21,3,'How satisfied are you with your current role?','2026-08-02 09:41:08'),(22,3,'Do you feel valued and recognized for your work?','2026-08-02 09:41:08'),(23,3,'How motivated do you feel to perform your best at work?','2026-08-02 09:41:08'),(24,3,'Do you have the resources and tools needed to do your job effectively?','2026-08-02 09:41:08'),(25,3,'How satisfied are you with communication from management?','2026-08-02 09:41:08'),(26,3,'Do you feel your career growth opportunities are supported here?','2026-08-02 09:41:08'),(27,3,'How well does your team collaborate and support each other?','2026-08-02 09:41:08'),(28,3,'Do you feel your work contributes to the company’s goals?','2026-08-02 09:41:08'),(29,3,'How satisfied are you with work-life balance?','2026-08-02 09:41:08'),(30,3,'What changes would make you more engaged at work?','2026-08-02 09:41:08'),(31,4,'How often do you use our product?','2026-08-02 09:41:08'),(32,4,'How easy is our product to use?','2026-08-02 09:41:08'),(33,4,'How satisfied are you with the product’s features?','2026-08-02 09:41:08'),(34,4,'How well does the product meet your needs?','2026-08-02 09:41:08'),(35,4,'How would you rate the product’s reliability?','2026-08-02 09:41:08'),(36,4,'How satisfied are you with the product’s design and usability?','2026-08-02 09:41:08'),(37,4,'How likely are you to continue using this product?','2026-08-02 09:41:08'),(38,4,'How does our product compare to similar products you’ve used?','2026-08-02 09:41:08'),(39,4,'What features would you like to see added or improved?','2026-08-02 09:41:08'),(40,4,'Would you recommend this product to others?','2026-08-02 09:41:08'),(41,5,'How satisfied are you with the quality of care you received?','2026-08-02 09:41:08'),(42,5,'How well did the healthcare staff explain your treatment?','2026-08-02 09:41:08'),(43,5,'How respectful and courteous were the staff during your visit?','2026-08-02 09:41:08'),(44,5,'How satisfied are you with the waiting time?','2026-08-02 09:41:08'),(45,5,'How clean and comfortable were the facilities?','2026-08-02 09:41:08'),(46,5,'How well did the staff listen to your concerns?','2026-08-02 09:41:08'),(47,5,'How satisfied are you with the scheduling and appointment process?','2026-08-02 09:41:08'),(48,5,'How confident do you feel in the medical staff’s expertise?','2026-08-02 09:41:08'),(49,5,'How likely are you to return for future care?','2026-08-02 09:41:08'),(50,5,'What improvements would you suggest for our healthcare services?','2026-08-02 09:41:08'),(51,6,'How satisfied are you with the overall event experience?','2026-08-02 09:41:08'),(52,6,'How well was the event organized?','2026-08-02 09:41:08'),(53,6,'How satisfied are you with the venue/location?','2026-08-02 09:41:08'),(54,6,'How useful or relevant was the event content/sessions?','2026-08-02 09:41:08'),(55,6,'How engaging were the speakers/presenters?','2026-08-02 09:41:08'),(56,6,'How satisfied are you with the networking opportunities?','2026-08-02 09:41:08'),(57,6,'How well did the event meet your expectations?','2026-08-02 09:41:08'),(58,6,'How satisfied are you with the event’s duration and schedule?','2026-08-02 09:41:08'),(59,6,'How likely are you to attend future events with us?','2026-08-02 09:41:08'),(60,6,'What suggestions do you have to improve future events?','2026-08-02 09:41:08'),(64,8,'Add default questions to this category so that while creating survey it will be listed.',NULL),(65,8,'Add default questions to this category so that while creating survey it will be listed.',NULL);
/*!40000 ALTER TABLE `defaultquestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Draft'),(2,'Published'),(3,'Closed');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `surveycategory`
--

LOCK TABLES `surveycategory` WRITE;
/*!40000 ALTER TABLE `surveycategory` DISABLE KEYS */;
INSERT INTO `surveycategory` VALUES (1,'Course/Training Feedback Survey','Collects participants’ opinions on training sessions or courses. Helps measure learning effectiveness, trainer performance, and areas for improvement.',NULL),(2,'Customer Satisfication Survey','Gathers insights from customers about their overall experience with products or services. Useful for understanding satisfaction levels, loyalty, and service quality.',NULL),(3,'Employee Engagement Survey','Measures how motivated and connected employees feel at work. Identifies workplace culture strengths and areas to boost morale and productivity.',NULL),(4,'Product Feedback survey','Captures user opinions on product features, usability, and performance. Helps guide product development and innovation based on real customer needs.',NULL),(5,'Healtcare/Patient Feedback Survey','Collects patient experiences with healthcare services. Provides valuable input on care quality, communication, and overall satisfaction with medical facilities.',NULL),(6,'Event Feedback Survey','Evaluates attendee experiences at events. Helps organizers understand what worked well and what can be improved for future gatherings.',NULL),(8,'Morning training course','There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly.',2);
/*!40000 ALTER TABLE `surveycategory` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-21 18:26:02
