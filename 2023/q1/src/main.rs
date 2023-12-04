use std::{io::{self, BufRead}, fs::File, path::Path, collections::HashMap};



fn main() {
    let file_path = "src/input.txt";
    println!("In file: {}", file_path);

    let mut letters_to_digit_map = HashMap::new();

    letters_to_digit_map.insert(String::from("zero"), 0);
    letters_to_digit_map.insert(String::from("one"), 1);
    letters_to_digit_map.insert(String::from("two"), 2);
    letters_to_digit_map.insert(String::from("three"), 3);
    letters_to_digit_map.insert(String::from("four"), 4);
    letters_to_digit_map.insert(String::from("five"), 5);
    letters_to_digit_map.insert(String::from("six"), 6);
    letters_to_digit_map.insert(String::from("seven"), 7);
    letters_to_digit_map.insert(String::from("eight"), 8);
    letters_to_digit_map.insert(String::from("nine"), 9);
    
    if let Ok(lines) = read_lines(file_path) {

        let mut result = 0;
        let mut current_line_number = 0;

        for line in lines {
            if let Ok(calibration_string) = line {
                println!("Line {}: {}", current_line_number, calibration_string);
                
                let mut digits: Vec<u32> = Vec::new();
                
                // Get all digits from the string
                let mut index = 0;
                for c in calibration_string.chars() {
                    if c.is_digit(10) {
                        digits.push(c.to_digit(10).unwrap());
                    }
                    
                    // If the current word is in the map, add the digit to the vector
                    let mut temp_calibration_string = calibration_string.clone();
                    let mut end_index = index + 5;
                    if index + 5 > temp_calibration_string.len() {
                        end_index = temp_calibration_string.len();
                    }
                    let current_word = temp_calibration_string.drain(index..end_index).collect::<String>();
                    println!("Current word: {}", current_word);
                    
                    if current_word.contains(letters_to_digit_map.keys().any(|x| x.contains(&current_word)).to_string().as_str()) {
                        println!("Found: {}", current_word);
                        digits.push(*letters_to_digit_map.get(&current_word).unwrap());
                    }
                    index += 1;
                }

                // If there is only one digit, duplicate it
                if digits.len() == 1 {
                    digits.push(digits[0]);
                }

                // Remove digits between first and last
                digits.drain(1..digits.len()-1);
                
                println!("Digits: {:?}", digits);

                // Convert digits to number
                let num = digits.iter().fold(0, |acc, x| acc * 10 + x);
                
                result += num;
                println!("Number: {}", num);
            }

            current_line_number += 1;
        }

        println!("Result: {}", result);
    }
}

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
