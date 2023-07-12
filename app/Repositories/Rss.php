<?php
    namespace App\Repositories;

    class Rss {
        private $title;
        private $category;
        private $slug;
        private $description;
        private $image;

        public function setTitle($title){
            $this->title=$title;
        }
        public function setCategory($category){
            $this->category=$category;
        }
        public function setSlug($slug){
            $this->slug=$slug;
        }
        public function setDescription($description){
            $this->description=$description;

        }
        public function setImage($image){
            $this->image=$image;
        }
        public function getImage(){
            return $this->image;
        }


        public function getTitle(){
           return $this->title;
        }
        public function getCategory(){
            return $this->category;
        }
        public function getSlug(){
            return $this->slug;
        }
        public function getDescription(){
            return $this->description;
        }



    }
