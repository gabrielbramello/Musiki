package br.com.musiki.musikiAPI.enums;

public enum Key {
	
	NONE(-1, "None"),
	C(0, "C"),
    CSHARP(1, "C#/Db"),
    D(2, "D"),
    DSHARP(3, "D#/Eb"),
	E(4, "E"),
	F(5, "F"),
	FSHARP(6, "F#/Gb"),
	G(7, "G"),
	GSHARP(8, "G#/Ab"),
	A(9, "A"),
	ASHARP(10, "A#/Bb"),
	B(11, "B");
	
    private final int value;
    private final String displayName;

    private Key(int value, String displayName) {
        this.value = value;
        this.displayName = displayName;
    }

    public int getValue() {
        return value;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }

    public static Key fromValue(int value) {
        for (Key key : Key.values()) {
            if (key.getValue() == value) {
                return key;
            }
        }
        throw new IllegalArgumentException("Valor inválido: " + value);
    }
}

