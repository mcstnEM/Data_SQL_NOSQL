# Diagramme de class

```mermaid
---
title: BitChest Entity
---
classDiagram
direction LR

    Admin --|> User
    User "1" -- "0..1" Wallet
    Wallet -- "*" Crypto

    class Admin{
        +id: Int
        +mail: String
        +password: String
        +name: String
    }
    class User{
        +id: Int
        +mail: String
        +password: String
        +name: String
    }
    class Wallet{
        +id: Int
        +crypto_currencies: List~Crypto~
    }
    class Crypto{
        +id: Int
        +unit_price: Int
        +purchasing: date: Date, quantity: Int, currencies_rate: Float
        +total: Int
    }
```

# Example d'un simple diagramme de classe

![class_diagram_mutiplicite_example](./media/class_diagram_mutiplicite_example.png)

# Représentation d'une classe

![class_diagram_class_example](./media/class_diagram_class_example.png)

# Représentation d'un objet

![class_diagram_object_example](./media/class_diagram_object_example.png)

# Multiplicité en pratique

Nombre d'objets de la classe B associés à un objet de la classe A.

![class_diagram_mutiplicite_one](./media/class_diagram_mutiplicite_one.png)

![class_diagram_mutiplicite_one_or_zero](./media/class_diagram_mutiplicite_one_or_zero.png)

![class_diagram_mutiplicite_at_less_one_never_zero](./media/class_diagram_mutiplicite_at_less_one_never_zero.png)

![class_diagram_mutiplicite_zero_or_more](./media/class_diagram_mutiplicite_zero_or_more.png)

# Example d'utilisation de plantUML

[PlantUML](https://plantuml.com/fr/) est un outil open-source permettant de créer des diagrammes à partir d'un langage de texte brut.

Vous avez d'autres outils open-source pour la création de diagramme comme :
- [JetUML](https://www.jetuml.org/).
- [app.diagrams.net](https://app.diagrams.net/)
- et bien d'autre...

Voici un dernier outils, si vous préférer le drag-and-drop pour faire vos diragram : [moqups](https://moqups.com/).

## Example d'un script pour faire un diagramme de classe avec plantUML

```txt
@startuml
left to right direction

Client "1" -- "0..1" Wallet : possède

class Client {
  id: Int
  name: String
  role: List<String>
  ---
  doSomthing()
}

class Wallet {
  id: Int
  crypto_currencies: List<Crypto>
  ---
  addCrypto()
}

note as N1
  0 ou plus
end note
@enduml
```