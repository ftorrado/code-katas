#![allow(non_snake_case)]

/// From -- https://stackoverflow.com/questions/38406793/why-is-capitalizing-the-first-letter-of-a-string-so-convoluted-in-rust
fn capitalize(s: &str) -> String {
    let mut c = s.chars();
    match c.next() {
        None => String::new(),
        Some(f) => f.to_uppercase().collect::<String>() + c.as_str(),
    }
}

fn bottlesString(n: u32) -> String {
    match n {
        0 => "no more bottles".to_string(),
        1 => "1 bottle".to_string(),
        _ => format!("{} bottles", n),
    }
}

pub fn verse(n: u32) -> String {
    match n {
        0 => format!(
            "{} of beer on the wall, {} of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n",
            &capitalize(&bottlesString(n)), &bottlesString(n)
        ),
        _ => format!(
            "{} of beer on the wall, {} of beer.\nTake {} down and pass it around, {} of beer on the wall.\n",
            &capitalize(&bottlesString(n)), &bottlesString(n), if n == 1 { "it" } else { "one" }, &bottlesString(n-1)
        )
    }
}

pub fn sing(start: u32, end: u32) -> String {
    assert!(start > end);
    let verses: Vec<String> = (end..start + 1).map(verse).rev().collect();
    verses.join("\n")
}
